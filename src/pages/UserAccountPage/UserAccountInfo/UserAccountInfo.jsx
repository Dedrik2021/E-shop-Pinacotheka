import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';

import UserInfoSkeleton from '../../../skeletons/userInfoSkeleton';

import img from '../../../assets/images/unknow-photo.png';
import './userAccountInfo.scss';

const UserAccountInfo = () => {
    const { foundUser } = useSelector((state) => state.usersSlice);
    const user = foundUser !== null && foundUser

	return (
		<>
			<Helmet>
				<meta name="description" content={`Info`} />
				<title>{`Info`}</title>
			</Helmet>
			<section className="user-account-info">
            <span className="sr-only">Chat</span>
				<h1 className="title user-account-info__title">My Office</h1>

                {user !== undefined ? (
                    <div className="user-account-info__info user-account-info__info--wrapper">
					<div className="user-account-info__content">
						<div className="user-account-info__box-wrapper">
							<div className="user-account-info__img-wrapper">

							<img
								className="user-account-info__img"
								src={user.image === '' ? img : user.image}
								alt={user.title}
							/>
							<img
								className="user-account-info__img user-account-info__img--blur"
								src={user.image === '' ? img : user.image}
								alt={user.name}
							/>
							</div>
							{/* {showEditBtn()} */}
						</div>

						<div className="user-info">
							<span className="user-info__item">
								Name: <span>{user.title}</span>
							</span>
							<span className="user-info__item">
								Phone: <span>{user.tel}</span>
							</span>
							<span className="user-info__item">
								Instagram: <span>{user.instagram !== '' ? user.instagram : '#######.###'}</span>
							</span>
							<span className="user-info__item">
								City: <span>{user.city !== '' ? user.city : '########'}</span>
							</span>
							<span className="user-info__item">
								Email: <span>{user.email}</span>
							</span>
							<span className="user-info__item">
								Network: <span>{user.faceBook !== '' ? user.faceBook : '#######.###'}</span>
							</span>
							<span className="user-info__item">
								Country: <span>{user.country !== '' ? user.country : '########'}</span>
							</span>
							<span className="user-info__item">
								Address:{' '}
								<span>{user.addressStreet !== '' ? user.addressStreet : '##### ##### #####'}</span>
							</span>
						</div>
					</div>
				</div>
                ) : (
                    <UserInfoSkeleton/>
                )}
				
			</section>
		</>
	);
};

export default UserAccountInfo;
