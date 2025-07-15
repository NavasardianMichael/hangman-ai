import { STORE_VARS } from '../constants/app'

export const getPassedWordsFromLocalStorage = () => {
    const passedWords: string[] = []

    try {
        const passedWordsJson = localStorage.getItem(STORE_VARS.PASSED_WORDS)
        if (passedWordsJson) {
            const parsedWordsFromStorage = JSON.parse(passedWordsJson)
            if (Array.isArray(parsedWordsFromStorage)) passedWords.push(...parsedWordsFromStorage)
        }
    } catch {
        console.error('Error parsing passed words from localStorage')
    }

    return passedWords
}

export const processLocaleIssues = (word: string) => {
    return word.replaceAll("Ւ", "Ու");
};
