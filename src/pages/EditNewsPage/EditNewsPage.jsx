import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore/lite';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import InputForm from '../../components/InputForm/InputForm';
import TextareaForm from '../../components/TextareaForm/TextareaForm';

import { database, storage } from '../../firebase/firebaseConfig';
import { fetchNewsData } from '../../redux/modules/news/newsThunks';
import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import Spinner from '../../spinner/Spinner';
import EditNewsSkeleton from '../../skeletons/editNewsSkeleton';
import { Status } from '../../utils/status/status';

import img from '../../assets/images/news-image.jpg';
import EditIcon from '../../assets/sprite/edit-icon.svg';
import CheckIcon from '../../assets/sprite/check-icon.svg';
import CrossIcon from '../../assets/sprite/cross-icon.svg';

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
	const [edit, setEdit] = useState(null);
	const [editTitle, setEditTitle] = useState(false);

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
			.then(navigate(`/News/SingleNews/${id}`))
			.catch((error) => {
				alert(error.message);
			});

            setTimeout(() => {
                dispatch(fetchNewsData());
            }, 0);
	};

	const onStorage = () => {
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

	const clickOnEditBtn = (text, index) => {
		setEditTextInput({ val: text, isValid: true });
		setEdit(index);
	};

	const clickOnSaveTextBtn = (e, index) => {
		e.preventDefault();
		const docToUpdates = doc(database, 'news', foundNews.ID);
		updateDoc(docToUpdates, {
			textInfo: foundNews.textInfo.map((text, i) => {
				return index === i ? editTextInput.val : text;
			}),
		})
        .catch((error) => {
			alert(error.message);
		});
		setTimeout(() => {
			dispatch(fetchNewsData());
            setEdit(null)
		}, 200);
		
	};

	const clickOnEditTitleBtn = () => {
		setEditTitle(true);
		setTitleInput({ val: foundNews.title, isValid: true });
	};

	const clickOnSaveTitleBtn = (e) => {
		const docToUpdates = doc(database, 'news', foundNews.ID);
		e.preventDefault();
		updateDoc(docToUpdates, {
			title: titleInput.val === '' ? foundNews.title : titleInput.val,
		}).catch((error) => {
			alert(error.message);
		});
		setTimeout(() => {
			dispatch(fetchNewsData());
			setEditTitle(false);
		}, 200);
	};

	const onLoading = () => {
		if (loading) {
			return <Spinner />;
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
									onChange={(e) => setDataStorage(e.target.files[0])}
								/>
							</label>
							<button
								className="create-news__btn btn btn--red btn--universal"
								type="button"
								onClick={onStorage}
							>
								Add image
							</button>
						</div>
					</div>

					<div className="create-news__box">
						{editTitle ? (
							<div 
                                className="create-news__text-description"
                                style={{marginBottom: editTitle && '0', padding: editTitle && '0'}}    
                            >
								<div className="create-news__wrapper-btn">
									<button
										className="create-news__text-btn btn"
										type="submit"
										title="Save Title"
										onClick={(e) => clickOnSaveTitleBtn(e)}
									>
										<svg className="check" width="25" height="25">
											<use href={`${CheckIcon}#check-icon`}></use>
										</svg>
									</button>
									<button
										className="create-news__text-btn btn"
										type="button"
                                        title='Cancel'
										onClick={() => setEditTitle(false)}
									>
										<svg className="cross" width="25" height="25">
											<use href={`${CrossIcon}#cross-icon`}></use>
										</svg>
									</button>
								</div>
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
							</div>
						) : (
							<div 
                                className="create-news__text-description create-news__text-description--title"
                                style={{marginBottom: !editTitle && '15px', padding: !editTitle && '14px 0 16px'}}    
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

						{foundNews !== undefined &&
							foundNews.textInfo.map((text, i) => {
								return edit === i ? (
									<div 
                                        key={i} 
                                        className="create-news__text-description"
                                        style={{marginBottom: editTitle === i && '0', padding: editTitle === i && '0'}}  
                                    >
										<div className="create-news__wrapper-btn">
											<button
												className="create-news__text-btn btn"
												type="submit"
												title="Save Text"
												onClick={(e) => clickOnSaveTextBtn(e, i)}
											>
												<svg className="check" width="25" height="25">
													<use href={`${CheckIcon}#check-icon`}></use>
												</svg>
											</button>
											<button
												className="create-news__text-btn btn"
												type="button"
                                                title='Cancel'
												onClick={() => setEdit(null)}
											>
												<svg className="cross" width="25" height="25">
													<use href={`${CrossIcon}#cross-icon`}></use>
												</svg>
											</button>
										</div>
										<InputForm
											id="edit-text"
											srOnly="Name"
											inputValue={editTextInput}
											setInputValue={setEditTextInput}
											type="text"
											placeholder="Type a Title Your News"
											name="text"
											message="The Title field should not be empty!"
											inputRef={textInputRefs}
											labelName="Edit Text"
										/>
									</div>
								) : (
									<div 
                                        key={i} 
                                        className="create-news__text-description"
                                        style={{marginBottom: edit !== i && '15px', padding: edit !== i && '5px 0 7px'}}  
                                    >
										<p>{text}</p>
										<button
											title="Edit Text"
											className="create-news__text-btn create-news__text-btn--edit btn"
											type="button"
											onClick={() => clickOnEditBtn(text, i)}
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
							message="The Text field should not be empty!"
							textareaRef={textInputRefs}
							labelName="Create New Text"
							styleArea={{ marginBottom: '35px', height: '185px' }}
                            styleBlock={{paddingTop: '20px'}}
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
                <EditNewsSkeleton/>
            )}
		</div>
	);
};

export default EditNews;
