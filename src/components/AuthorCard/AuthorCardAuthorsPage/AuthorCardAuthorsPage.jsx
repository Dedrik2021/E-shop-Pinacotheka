import {memo} from 'react'
import {Link} from 'react-router-dom'

const AuthorCardAuthorsPage = memo((props) => {
    const {switchBtn, item, unknowImg,} = props

    return ( 
        <li className="authors__item" style={{height: '250px'}} key={item.id}>
					<article className="author-card" style={{maxWidth: '825px', width: '100%'}}>
						<Link
							className="author-card__img-link"
							to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
							// onClick={() => dispatch(setAuthorInfoBtn(0))}
						>
							<img src={item.image !== '' ? item.image : unknowImg} alt={item.title} width="122" height="210" />
							<span className="author-card__online @@online"></span>
						</Link>
						<div className="author-card__box" style={{textAlign: 'center', width: '100%'}}>
							<Link
								className="author-card__link"
								to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
								// onClick={() => dispatch(setAuthorInfoBtn(0))}
							>
								<h2 className="author-card__user" >{item.title}</h2>
							</Link>
							<div className="author-card__rating">
								<div className="author-card__stars"></div>
								<span>rating</span>
							</div>
							<div className="author-card__wrapper">
								<Link
									className="author-card__portfolio author-card__portfolio--reviews"
									style={{pointerEvents: item.feedBack.length === 0 && 'none'}}
									// onClick={() => dispatch(setAuthorInfoBtn(2))}
									to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
								>
									<span>{item.feedBack.length}</span>
								</Link>
								<Link
									className="author-card__portfolio"
									// onClick={() => dispatch(setAuthorInfoBtn(1))}
									style={{pointerEvents: item.works.length === 0 && 'none'}}
									to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
								>
									<span>{item.works.length}</span>
								</Link>
							</div>
							<ul className="author-painting">
								{item.works.length > 0 ? (
									item.works.slice(0, 5).map((item) => {
										return (
										<li className="author-painting__item" key={item.id}>
											<Link
												className="author-painting__link"
												to={`/Autor/Einzelmalerei/${item.id}`}
												// onClick={() => onPainting(item.id)}
											>
												<img
													src={item.img}
													alt={item.title}
													height="92"
													width="92"
												/>
											</Link>
										</li>
									)
									})
								) : (
									<p>{switchBtn ? 'Dieser Autor hat noch keine Werke.' : 'This author has no works yet.'}</p>
								)}
								{item.works.length > 0 && (
									<li className="author-painting__item">
									<Link
										className="author-painting__link"
										// onClick={() => dispatch(setAuthorInfoBtn(1))}
										to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
									>
										{switchBtn ? 'Alle Werke ansehen' : 'View all works'}
									</Link>
								</li>
								)}
							</ul>
						</div>
					</article>
				</li>
    );
})

export default AuthorCardAuthorsPage;