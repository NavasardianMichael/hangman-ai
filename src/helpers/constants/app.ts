import { SelectProps } from 'antd'

export const PLAYERS = {
  player1: 'player1',
  player2: 'player2',
} as const

export const PLAY_MODES = {
  single: 'single',
  multiplayer: 'multiplayer',
} as const

export const GAME_STAGES = {
  start: 'start',
  settings: 'settings',
  composition: 'composition',
  discovery: 'discovery',
  summary: 'summary',
  end: 'end',
} as const

export const CATEGORIES = {
  ցանկացած: 'ցանկացած',
  քաղաքներ: 'քաղաքներ',
  ['հայկական տեղանուններ']: 'հայկական տեղանուններ',
  երկրներ: 'երկրներ',
  ['անվանի մարդիկ']: 'անվանի մարդիկ',
  ['հայ անվանի մարդիկ']: 'հայ անվանի մարդիկ',
  կենդանիներ: 'կենդանիներ',
  ուտելիք: 'ուտելիք',
  մասնագիտություններ: 'մասնագիտություններ',
  սպորտ: 'սպորտ',
  ֆուտբոլ: 'ֆուտբոլ և ֆուտբոլիստներ',
  երաժշտություն: 'երաժշտություն',
  ֆիլմեր: 'ֆիլմեր',
  գրքեր: 'գրքեր',
  ['հայոց պատմություն']: 'հայոց պատմություն',
  ['հայոց լեզու']: 'հայոց լեզու',
  ['հայ գրականություն']: 'հայ գրականություն',
  ['համաշխարհային գրականություն']: 'համաշխարհային գրականություն',
  եկեղեցի: 'եկեղեցի',
  ['հայ եկեղեցի']: 'հայ եկեղեցի',
  բնություն: 'բնություն',
  պատմություն: 'պատմություն',
  արվեստ: 'արվեստ',
  գիտություն: 'գիտություն',
  լեզուներ: 'լեզուներ',
  քաղաքականություն: 'քաղաքականություն',
  բժշկություն: 'բժշկություն',
  տնտեսություն: 'տնտեսություն',
  հոգեբանություն: 'հոգեբանություն',
  փիլիսոփայություն: 'փիլիսոփայություն',
  մեքենաներ: 'մեքենաներ',
  ['մինչև 8 տարեկանների համար']: 'մինչև 10 տարեկանների համար',
} as const

export const CATEGORIES_OPTIONS: SelectProps['options'] = Object.entries(CATEGORIES).map(([label, value]) => ({
  label,
  value,
}))

export const DIFFICULTY_LEVELS = {
  ['շատ հեշտ']: 'շատ հեշտ',
  հեշտ: 'հեշտ',
  միջին: 'միջին',
  դժվար: 'դժվար',
  ['շատ դժվար']: 'շատ դժվար',
} as const

export const DIFFICULTY_LEVELS_OPTIONS: SelectProps['options'] = Object.entries(DIFFICULTY_LEVELS).map(
  ([label, value]) => ({
    label,
    value,
  })
)

export const STAGES_WITH_CLEAR_BACKGROUND: (keyof typeof GAME_STAGES)[] = [
  GAME_STAGES.start,
  // GAME_STAGES.summary,
]

export const STAGES_HIDE_BREADCRUMB: (keyof typeof GAME_STAGES)[] = [
  GAME_STAGES.start,
  // GAME_STAGES.summary,
  GAME_STAGES.end,
  GAME_STAGES.settings,
]

export const ALPHABET = [
  'Ա',
  'Բ',
  'Գ',
  'Դ',
  'Ե',
  'Զ',
  'Է',
  'Ը',
  'Թ',
  'Ժ',
  'Ի',
  'Լ',
  'Խ',
  'Ծ',
  'Կ',
  'Հ',
  'Ձ',
  'Ղ',
  'Ճ',
  'Մ',
  'Յ',
  'Ն',
  'Շ',
  'Ո',
  'Չ',
  'Պ',
  'Ջ',
  'Ռ',
  'Ս',
  'Վ',
  'Տ',
  'Ր',
  'Ց',
  'ՈՒ',
  'Փ',
  'Ք',
  'Օ',
  'Ֆ',
] as const

export const LETTERS = [
  'Է',
  'Թ',
  'Փ',
  'Ձ',
  'Ջ',
  'Ր',
  'Չ',
  'Ճ',
  'Ժ',
  'Ծ',
  'Ք',
  'Ո',
  'Ե',
  'Ռ',
  'Տ',
  'Ը',
  'ՈՒ',
  'Ի',
  'Օ',
  'Պ',
  'Ա',
  'Ս',
  'Դ',
  'Ֆ',
  'Գ',
  'Հ',
  'Յ',
  'Կ',
  'Լ',
  'Խ',
  'Զ',
  'Ղ',
  'Ց',
  'Վ',
  'Բ',
  'Ն',
  'Մ',
  'Շ',
] as const

export const SPACE_CHAR = '⌴' as const

export const STORE_VARS = {
  DB_NAME: 'hangman-ai',
  STORE_NAME: 'store',
  PRIMARY_KEY: 'app',
  COUNTDOWN_LAST_VALUE: 'hangman-ai-countdownLastValue',
  WASTED_LETTERS: 'hangman-ai-wastedLetters',
  GUESSED_LETTERS: 'hangman-ai-guessedLetters',
  PASSED_WORDS: 'hangman-ai-passedWords',
  PWA_INSTALLED: 'hangman-ai-pwa-installed',
} as const
