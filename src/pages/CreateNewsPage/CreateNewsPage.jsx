import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore/lite';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import InputForm from '../../components/InputForm/InputForm';
import TextareaForm from '../../components/TextareaForm/TextareaForm';

import { database, storage } from '../../firebase/firebaseConfig';
import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import { fetchNewsData } from '../../redux/modules/news/newsThunks';
import Spinner from '../../spinner/Spinner';

import img from '../../assets/images/news-image.jpg';

import './createNewsPage.scss';

const CreateNewsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const titleInputRefs = useRef();
	const textInputRefs = useRef();

	const [titleInput, setTitleInput] = useState({ val: '', isValid: true });
	const [textInput, setTextInput] = useState({ val: '', isValid: true });
	const [dataStorage, setDataStorage] = useState({});
	const [imageInput, setImageInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [newsImg, setNewsImg] = useState('');
	const [formIsValid, setFormIsValid] = useState(true)
	const [activeBtn, setActiveBtn] = useState(false)

	const { newsData } = useSelector((state) => state.newsSlice);
	const { foundUser } = useSelector((state) => state.usersSlice);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const changeImg = newsImg === '' ? newsData.image : newsImg;
	const emptyImg = newsImg === '' ? img : newsImg;

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 35);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	const createNews = (e) => {
		e.preventDefault();
		textInputsValidate()
		if (!formIsValid) return

		if (titleInput.val !== '' && textInput.val !== '') {
			addDoc(collection(database, 'news'), {
				id: new Date().toISOString(),
				image: newsImg === '' ? img : newsImg,
				title: titleInput.val,
				textInfo: [textInput.val],
				data: new Date().toLocaleDateString(),
				author: foundUser.title,
				authorEmail: foundUser.emailId,
				page: '/News/SingleNews/'
			})
				.then(setActiveBtn(false))
				.then(navigate('/News'))
				.catch((error) => {
					alert(error.message);
				});
			setTimeout(() => {
				dispatch(fetchNewsData());
			}, 100);
		}
	};

	const textInputsValidate = () => {
		setFormIsValid(true)

		if (titleInput.val === '') {
			setTitleInput({val: '', isValid: false})
			setFormIsValid(false)
		}

		if (textInput.val === '') {
			setTextInput({val: '', isValid: false})
			setFormIsValid(false)
		}
	}

	const onStorage = () => {
		setActiveBtn(false)
		const storageRef = ref(storage, `images/ news/ ${newsData.length + 1}/${dataStorage.name}`);
		const uploadTask = uploadBytesResumable(storageRef, dataStorage);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				setLoading(true);
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`Upload is ${progress}% done`);
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL);
					let img = [];
					if (downloadURL) {
						setTimeout(() => {
							img.push(downloadURL);
							setNewsImg(img[0]);
							setLoading(false);
						}, 0);
					}
				});
			},
		);
	};

	const changeImage = (e) => {
		setImageInput(e.target.value);
		setDataStorage(e.target.files[0])
		setTimeout(() => {
			setActiveBtn(true)
		}, 100);
	};

	const onLoading = () => {
		if (loading) {
			return <Spinner />;
		} else {
			return (
				<>
					<img
						className="create-news__img"
						src={newsImg === '' ? emptyImg : changeImg}
						alt={titleInput.val}
						width={290}
						height={400}
					/>
					<img
						className="create-news__img create-news__img--blur"
						src={newsImg === '' ? emptyImg : changeImg}
						alt={titleInput.val}
						width={290}
						height={400}
					/>
				</>
			);
		}
	};

	return (
		<div className="container">
			<Helmet>
				<meta
					name="description"
					content={switchBtn ? 'Nachrichten erstellen' : 'Create News'}
				/>
				<title>{switchBtn ? 'Nachrichten erstellen' : 'Create News'}</title>
			</Helmet>
			<BreadCrumbs />
			<h1 className="create-news__title title">
				{switchBtn ? 'Nachrichten erstellen' : 'Create News'}
			</h1>
			<section className="create-news">
				<form className="create-news__form" onSubmit={(e) => createNews(e)}>
					<div className="create-news__block">
						<div className="create-news__img-wrapper">{onLoading()}</div>
						<div className="create-news__block-btn">
							<label
								className="create-news__label create-news__label--img btn btn--universal"
								htmlFor="img"
							>
								Select image
								<input
									className="create-news__input create-news__input--img"
									type="file"
									name="img"
									id="img"
									onChange={(e) => changeImage(e)}
								/>
							</label>
							<button
								className={`create-news__btn create-news__btn--add btn btn--red btn--universal ${activeBtn ? 'active' : ''}`}
								type="button"
								onClick={onStorage}
							>
								Add image
							</button>
						</div>
					</div>

					<div className="create-news__box">
						<InputForm
							id="title"
							srOnly="Name"
							inputValue={titleInput}
							setInputValue={setTitleInput}
							type="text"
							placeholder="Type a Title Your News"
							name="title"
							message="The Title field should not be empty!"
							inputRef={titleInputRefs}
							labelName="Title"
						/>

						<TextareaForm
							id="text"
							srOnly="Text"
							textareaValue={textInput}
							setTextareaValue={setTextInput}
							type="text"
							placeholder="Type a Description Your News"
							name="text"
							message="The Text field should not be empty!"
							textareaRef={textInputRefs}
							labelName="Text"
							styleArea={{ marginBottom: textInput.isValid ? '35px' : '10px' }}
						/>
						<div className="create-news__btns-wrapper">
							<button
								className="create-news__btn create-news__btn--cancel btn btn--universal"
								type="button"
								onClick={() => navigate(switchBtn ? '/Nachrichten' : '/News')}
							>
								Cancel
							</button>
							<button
								className="create-news__btn btn btn--red btn--universal"
								type="submit"
							>
								Save
							</button>
						</div>
					</div>
				</form>
			</section>
		</div>
	);
};

export default CreateNewsPage;
