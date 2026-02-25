import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  // Charge la langue sauvegardée au démarrage
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'en';
    i18n.changeLanguage(savedLang);
    setCurrentLang(savedLang);
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem('i18nextLng', lng); 
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`
          px-3 py-1.5 rounded-md text-sm font-medium transition-colors
          ${currentLang === 'en'
            ? 'bg-[linear-gradient(180deg,rgba(81,162,255,1)_0%,rgba(173,70,255,1)_50%,rgba(255,43,127,1)_100%)] text-white shadow-sm'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage('fr')}
        className={`
          px-3 py-1.5 rounded-md text-sm font-medium transition-colors
          ${currentLang === 'fr'
            ? 'bg-[linear-gradient(180deg,rgba(81,162,255,1)_0%,rgba(173,70,255,1)_50%,rgba(255,43,127,1)_100%)] text-white shadow-sm'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        FR
      </button>
    </div>
  );
}