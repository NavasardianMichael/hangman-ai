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
  երկրներ: 'երկրներ',
  կենդանիներ: 'կենդանիներ',
  ուտելիք: 'ուտելիք',
  քաղաքներ: 'քաղաքներ',
  մասնագիտություններ: 'մասնագիտություններ',
  սպորտ: 'սպորտ',
  երաժշտություն: 'երաժշտություն',
  ֆիլմեր: 'ֆիլմեր',
  գրքեր: 'գրքեր',
  բնություն: 'բնություն',
  պատմություն: 'պատմություն',
  արվեստ: 'արվեստ',
  գիտություն: 'գիտություն',
  ֆուտբոլ: 'ֆուտբոլ',
} as const

export const CATEGORIES_OPTIONS: SelectProps['options'] = Object.entries(CATEGORIES).map(([label, value]) => ({
  label,
  value,
}))

export const DIFFICULTY_LEVELS = {
  հեշտ: 'հեշտ',
  միջին: 'միջին',
  դժվար: 'դժվար',
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
  GAME_STAGES.summary,
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
  'Ւ',
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
  'Ւ',
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
