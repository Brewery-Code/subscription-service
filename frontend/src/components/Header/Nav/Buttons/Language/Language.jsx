import { useState } from 'react';

import arrow from '../../../../../assets/icons/arrow-slim.svg';

import styls from './Language.module.scss';

export default function Language() {
  const [languageListState, setLanguageListState] = useState(false);

  const toggleLanguageListState = () => {
    setLanguageListState(prevState => !prevState);
  }

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  return (
    <div className={styls.language}
      onClick={isMobile() ? toggleLanguageListState : undefined}
      onMouseEnter={!isMobile() ? toggleLanguageListState : undefined}
      onMouseLeave={!isMobile() ? toggleLanguageListState : undefined}
    >
      <button className={styls['language__selected-language']}>
        <h3>EN</h3><img className={styls['language__selected-language-arrow']} src={arrow} alt="arrow-icon" />
      </button>
      <ul className={`${styls.language__list} ${languageListState ? styls.language__list_active : ''}`}>
        <li className={styls['language__list-item']}><button>English</button></li>
        <li className={styls['language__list-item']}><button>Ukraine</button></li>
        <li className={styls['language__list-item']}><button>Russian</button></li>
      </ul>
    </div>
  )
}