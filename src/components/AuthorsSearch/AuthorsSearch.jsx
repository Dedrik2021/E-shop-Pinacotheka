import {memo} from 'react'

import CleanInputBtn from '../../UI/cleanInputBtn/CleanInputBtn';
import SearchIcon from '../../assets/sprite/search-icon.svg';

import './authorsSearch.scss'

const AuthorsSearch = memo((props) => {
    const {switchBtn, authorsSearchInput, searchAuthors, cleanSearchInput} = props

	return (
		<div className="authors__wrapper">
			<div className="authors-search">
				<label className="authors-search__label" htmlFor="search-authors" >
                <svg width="16" height="16" className='authors-search__search'>
					<use href={`${SearchIcon}#search-icon`}></use>
				</svg>
                <CleanInputBtn
                    inputValue={authorsSearchInput}
                    setInputValue={cleanSearchInput}
                />
				</label>
				<input
					className="authors-search__input"
					type="text"
                    value={authorsSearchInput.val}
					name="[authors]search"
					id="search-authors"
					placeholder={switchBtn ? 'Suche nach Nachnamen' : 'Search for last name'}
                    onChange={(e) => searchAuthors(e)}
				/>
			</div>
		</div>
	);
})

export default AuthorsSearch;
