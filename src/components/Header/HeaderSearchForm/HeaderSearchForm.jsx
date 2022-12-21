import SearchIcon from '../../../assets/sprite/search-icon.svg';

import CleanInputBtn from '../../../UI/cleanInputBtn/CleanInputBtn';

import './headerSearchForm.scss'

const HeaderSearchForm = ({ searchFormProps }) => {
	return (
		<form
			className={`menu__form ${searchFormProps.search ? 'active' : ''} `}
			ref={searchFormProps.formRefs}
		>
			<label className="menu__label" htmlFor="nav-search">
				<span className="sr-only">{searchFormProps.switchBtn ? 'Suche' : 'Search'}</span>
			</label>
			<input
				className={`menu__search ${searchFormProps.search ? 'active' : ''}`}
				ref={searchFormProps.inputRefs}
				type="search"
				name="[nav]search"
				placeholder={searchFormProps.switchBtn ? 'Tippe um zu suchen' : 'Tap to search'}
				id="nav-search"
				value={searchFormProps.searchInput.val}
				onChange={(e) =>
					searchFormProps.setSearchInput({ val: e.target.value, isValid: true })
				}
				required
			/>
			<CleanInputBtn
				inputValue={searchFormProps.searchInput}
				setInputValue={searchFormProps.setSearchInput}
			/>

			<button 
				className="menu__btn btn" 
				type="button"
				onClick={searchFormProps.clickSearchOpen}
				>
				<span className="sr-only">
					{searchFormProps.switchBtn ? 'Suche drücken' : 'Press Search'}
				</span>
				<svg width="16" height="16">
					<use href={`${SearchIcon}#search-icon`}></use>
				</svg>
			</button>
		</form>
	);
};

export default HeaderSearchForm;
