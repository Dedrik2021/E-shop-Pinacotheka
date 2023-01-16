import SearchIcon from '../../../assets/sprite/search-icon.svg';

import CleanInputBtn from '../../../UI/cleanInputBtn/CleanInputBtn';

import './headerSearchForm.scss'

const HeaderSearchForm = ({ searchFormProps, searchInputRefs }) => {
	return (
		<form
			className={`menu__form ${searchFormProps.search ? 'active' : ''} `}
			ref={searchFormProps.formRefs}
		>
			<div className={`menu__form-wrapper ${searchFormProps.search ? 'active' : ''}`}>
			<label className="menu__label" htmlFor="nav-search" ref={searchInputRefs}>
				<span className="sr-only">{searchFormProps.switchBtn ? 'Suche' : 'Search'}</span>
				<CleanInputBtn
				inputValue={searchFormProps.searchInput}
				setInputValue={searchFormProps.setSearchInput}
				id={1}
			/>
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
			</div>

			<button 
				className="menu__btn btn" 
				type="button"
				title={searchFormProps.search ? 'Close Search' : 'Open Search'}
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
