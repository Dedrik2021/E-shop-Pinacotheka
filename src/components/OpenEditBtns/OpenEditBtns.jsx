import CheckIcon from '../../assets/sprite/check-icon.svg';
import CrossIcon from '../../assets/sprite/cross-icon.svg';

import './openEditBtns.scss'

const OpenEditBtns = ({clickOnSaveEditing, cancelEdit}) => {
	return (
		<div className="create-news__wrapper-btn">
			<button
				className="create-news__text-btn btn"
				type="submit"
				title="Save Title"
				onClick={clickOnSaveEditing}
			>
				<svg className="check" width="25" height="25">
					<use href={`${CheckIcon}#check-icon`}></use>
				</svg>
			</button>
			<button
				className="create-news__text-btn btn"
				type="button"
				title="Cancel"
				onClick={() => cancelEdit(false)}
			>
				<svg className="cross" width="25" height="25">
					<use href={`${CrossIcon}#cross-icon`}></use>
				</svg>
			</button>
		</div>
	);
};

export default OpenEditBtns;
