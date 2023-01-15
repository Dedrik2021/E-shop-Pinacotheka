import { memo } from 'react';
import { useSelector } from 'react-redux';

import CleanInputIcon from '../../assets/sprite/clean-input-icon.svg';
import Keyboard from '../../assets/sprite/keyboard-icon.svg';

import './cleanInputBtn.scss';

const CleanInputBtn = memo(({ inputValue, setInputValue, id }) => {
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchLangBtn = switchLanguageBtn[0] === 0;

	return (
		<span className="clean">
			{inputValue.val ? (
				<button 
					className="clean-btn btn" 
					type="button" 
					id={id}
					onClick={() => setInputValue({val: '', isValid: true})}
					title={inputValue ? 'Clean Input' : 'Type in Input'}
				>
					<span className="sr-only">
						{switchLangBtn ? 'Eingabefeld löschen' : 'Delete input field'}
					</span>
					<svg className='cross' width="20" height="20">
						<use href={`${CleanInputIcon}#clean-input`}></use>
					</svg>
				</button>
			) : (
				<svg className="keyboard" width="20" height="20">
					<use href={`${Keyboard}#keyboard`}></use>
				</svg>
			)}
		</span>
	);
});

export default CleanInputBtn;
