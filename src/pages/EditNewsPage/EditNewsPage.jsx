import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore/lite';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import InputForm from '../../components/InputForm/InputForm';
import TextareaForm from '../../components/TextareaForm/TextareaForm';
import OpenEditBtns from '../../components/OpenEditBtns/OpenEditBtns';

import { database, storage } from '../../firebase/firebaseConfig';
import { fetchNewsData } from '../../redux/modules/news/newsThunks';
import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import Spinner from '../../spinner/Spinner';
import EditNewsSkeleton from '../../skeletons/editNewsSkeleton';
import { Status } from '../../utils/status/status';

import img from '../../assets/images/news-image.jpg';
import EditIcon from '../../assets/sprite/edit-icon.svg';

import './editNewsPage.scss';

const EditNews = () => {
	const { id } = useParams();

	const titleInputRefs = useRef();
	const textInputRefs = useRef();

	const [titleInput, setTitleInput] = useState({ val: '', isValid: true });
	const [textInput, setTextInput] = useState({ val: '', isValid: true });
	const [editTextInput, setEditTextInput] = useState({ val: '', isValid: true });
	const [dataStorage, setDataStorage] = useState({});
	const [loading, setLoading] = useState(false);
	const [newsImg, setNewsImg] = useState('');
	const [editText, setEditText] = useState(null);
	const [editTitle, setEditTitle] = useState(false);
	const [activeBtn, setActiveBtn] = useState(false);
	const [progress, setProgress] = useState(0)

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { newsData, newsDataStatus } = useSelector((state) => state.newsSlice);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const foundNews = newsData.find((item) => item.id == id);
	const changeImg = foundNews === undefined ? null : foundNews.image;
	const emptyImg = foundNews === undefined ? img : newsImg;

	useEffect(() => {
		window.scroll(0, 0);
	}, [dispatch, foundNews]);

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = switchBtn
			? window.location.pathname.substring(1, 34)
			: window.location.pathname.substring(1, 14);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch, switchBtn]);

	const saveEditNews = (e) => {
		e.preventDefault();
		const docToUpdates = doc(database, 'news', foundNews.ID);
		updateDoc(docToUpdates, {
			image: newsImg === '' ? foundNews.image : newsImg,
			title: titleInput.val === '' ? foundNews.title : titleInput.val,
			textInfo: textInput.val === '' ? foundNews.textInfo : arrayUnion(textInput.val),
			data: new Date().toLocaleDateString(),
		})
			.then(setActiveBtn(false))
			.then(navigate(`/News/SingleNews/${id}`))
			.catch((error) => {
				alert(error.message);
			});
		dispatch(fetchNewsData());
		setTimeout(() => {
			dispatch(fetchNewsData());
		}, 900);
	};

	const onStorage = () => {
		setActiveBtn(false);
		const storageRef = ref(storage, `images/ news/ ${newsData.length + 1}/${dataStorage.name}`);
		const uploadTask = uploadBytesResumable(storageRef, dataStorage);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				setLoading(true);
				setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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

	const clickOnEditTextBtn = (text, index) => {
		setEditTextInput({ val: text, isValid: true });
		setEditText(index);
		setEditTitle(false);
	};

	const clickOnSaveTextBtn = (e, index) => {
		e.preventDefault();
		const docToUpdates = doc(database, 'news', foundNews.ID);
		updateDoc(docToUpdates, {
			textInfo: foundNews.textInfo.map((text, i) => {
				return index === i && editTextInput.val !== '' ? editTextInput.val : text;
			}),
		}).catch((error) => {
			alert(error.message);
		});
		dispatch(fetchNewsData());
		setTimeout(() => {
			dispatch(fetchNewsData());
			setEditText(null);
		}, 900);
	};

	const clickOnEditTitleBtn = () => {
		setEditText(null);
		setEditTitle(true);
		setTitleInput({ val: foundNews.title, isValid: true });
	};

	const clickOnSaveTitleBtn = (e) => {
		e.preventDefault();
		const docToUpdates = doc(database, 'news', foundNews.ID);
		updateDoc(docToUpdates, {
			title: titleInput.val === '' ? foundNews.title : titleInput.val,
		}).catch((error) => {
			alert(error.message);
		});
		dispatch(fetchNewsData());
		setTimeout(() => {
			dispatch(fetchNewsData());
			setEditTitle(false);
		}, 900);
	};

	const changeImage = (e) => {
		setDataStorage(e.target.files[0]);
		setTimeout(() => {
			setActiveBtn(true);
		}, 100);
	};

	const onLoading = () => {
		if (loading) {
			return (
				<>
					<Spinner 
						styleProps={{with: '100%', height: '100%', objectFit: 'contain', position: 'relative', padding: '130px 130px', display: 'block', margin: '0 auto'}}
					/>
					<span className='progress'>{Math.floor(progress)} %</span>
				</>
			);
		} else {
			return (
				<>
					<img
						className="create-news__img"
						src={newsImg === '' ? changeImg : emptyImg}
						alt={newsData.title}
						width={290}
						height={400}
					/>
					<img
						className="create-news__img create-news__img--blur"
						src={newsImg === '' ? changeImg : emptyImg}
						alt={newsData.title}
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
					content={switchBtn ? 'Nachrichten erstellen' : 'Edit News'}
				/>
				<title>{switchBtn ? 'Neuigkeiten bearbeiten' : 'Edit News'}</title>
			</Helmet>
			<BreadCrumbs />
			<h1 className="create-news__title title">
				{switchBtn ? 'Nachrichten erstellen' : 'Edit News'}
			</h1>
			{newsDataStatus === Status.SUCCESS ? (
				<section className="create-news">
					<form className="create-news__form" onSubmit={(e) => saveEditNews(e)}>
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
									className={`create-news__btn create-news__btn--add btn btn--red btn--universal ${
										activeBtn ? 'active' : ''
									}`}
									type="button"
									onClick={onStorage}
								>
									Add image
								</button>
							</div>
						</div>

						<div className="create-news__box">
							<span className="create-news__edittile title">Title</span>
							{editTitle ? (
								<div
									className="create-news__text-description"
									style={{
										marginBottom: editTitle && '0',
										padding: editTitle && '0',
									}}
								>
									<OpenEditBtns
										clickOnSaveEditing={(e) => clickOnSaveTitleBtn(e)}
										cancelEdit={setEditTitle}
									/>
									<InputForm
										id="title"
										srOnly="Name"
										inputValue={titleInput}
										setInputValue={setTitleInput}
										type="text"
										placeholder="Type a Title Your News"
										name="title"
										inputRef={titleInputRefs}
										labelName="Title"
									/>
								</div>
							) : (
								<div
									className="create-news__text-description create-news__text-description--title"
									style={{
										marginBottom: !editTitle && '15px',
										padding: !editTitle && '14px 0 16px',
									}}
								>
									<p>{foundNews !== undefined && foundNews.title}</p>
									<button
										className="create-news__text-btn create-news__text-btn--edit btn"
										title="Edit Title"
										type="button"
										onClick={clickOnEditTitleBtn}
									>
										<svg className="edit" width="23" height="25">
											<use href={`${EditIcon}#edit`}></use>
										</svg>
									</button>
								</div>
							)}
							<span className="create-news__edittile title">Text</span>
							{foundNews !== undefined &&
								foundNews.textInfo.map((text, i) => {
									return editText === i ? (
										<div
											key={i}
											className="create-news__text-description"
											style={{
												marginBottom: editText === i && '0',
												padding: editText === i && '0',
											}}
										>
											<OpenEditBtns
												clickOnSaveEditing={(e) => clickOnSaveTextBtn(e, i)}
												cancelEdit={setEditText}
											/>
											<TextareaForm
												id="text-input"
												srOnly="Text"
												textareaValue={editTextInput}
												setTextareaValue={setEditTextInput}
												type="text"
												placeholder="Type a Description Your News"
												name="text"
												textareaRef={textInputRefs}
												labelName="Edit Text"
												styleArea={{ marginBottom: '5px', height: '185px' }}
											/>
										</div>
									) : (
										<div
											key={i}
											className="create-news__text-description"
											style={{
												marginBottom: editText !== i && '15px',
												padding: editText !== i && '5px 0 7px',
											}}
										>
											<p>{text}</p>
											<button
												title="Edit Text"
												className="create-news__text-btn create-news__text-btn--edit btn"
												type="button"
												onClick={() => clickOnEditTextBtn(text, i)}
											>
												<svg className="edit" width="23" height="25">
													<use href={`${EditIcon}#edit`}></use>
												</svg>
											</button>
										</div>
									);
								})}

							<TextareaForm
								id="text"
								srOnly="Text"
								textareaValue={textInput}
								setTextareaValue={setTextInput}
								type="text"
								placeholder="Type a Description Your News"
								name="text"
								textareaRef={textInputRefs}
								labelName="Create New Text"
								styleArea={{ marginBottom: '35px', height: '185px' }}
								styleBlock={{ paddingTop: '20px' }}
							/>

							<div className="create-news__btns-wrapper">
								<button
									className="create-news__btn create-news__btn--cancel btn btn--universal"
									type="button"
									onClick={() => navigate(`/News/SingleNews/${id}`)}
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
			) : (
				<EditNewsSkeleton />
			)}
		</div>
	);
};

export default EditNews;
