'use client'

import { Button, Flex, Form, InputNumber, Radio, RadioGroupProps, RadioProps, Select, SelectProps } from 'antd'
import { getWord } from 'app/getWord/client'
import { CustomButton } from 'components/shared/customButton'
import { CATEGORIES_OPTIONS, DIFFICULTY_LEVELS_OPTIONS, GAME_STAGES } from 'helpers/constants/app'
import { StageComponent } from 'helpers/types/stage'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { MouseEventHandler, useMemo, useState } from 'react'
import { selectAppOptions, selectIsSingleMode } from 'store/app/selectors'
import { setAppOptions, setGameSettings } from 'store/app/slice'
import styles from './styles.module.css'
import { LeftOutlined } from '@ant-design/icons'

export const Settings: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const appState = useAppSelector(selectAppOptions)
  const { minLettersCount, category, difficulty, pointsToWin, timeLimit, withTimeLimit } = appState.settings
  const isSingleMode = useAppSelector(selectIsSingleMode)
  const [isPending, setIsPending] = useState(false)

  const onTimeLimitationChange: RadioProps['onChange'] = (e) => {
    const withTimeLimit = e.target.value
    dispatch(setGameSettings({ timeLimit: 60, withTimeLimit }))
  }

  const handleStartGameBtnClick: MouseEventHandler<HTMLButtonElement> = async () => {
    if (isPending) return
    if (isSingleMode) {
      setIsPending(true)
      const newWord = await getWord({ minLettersCount, category, difficulty })
      dispatch(setAppOptions({ currentWord: newWord }))
      setIsPending(false)
    }
    toNextPage()
  }

  const handleCategoryChange: SelectProps['onChange'] = (value) => {
    dispatch(setGameSettings({ category: value }))
  }

  const handleDifficultyChange: SelectProps['onChange'] = (value) => {
    dispatch(setGameSettings({ difficulty: value }))
  }

  const isStartGameDisabled = useMemo(() => {
    return isPending || !minLettersCount || !category || !difficulty || pointsToWin < 1 || timeLimit < 1
  }, [isPending, minLettersCount, category, difficulty, pointsToWin, timeLimit])

  const timeLimitationOptions: RadioGroupProps['options'] = useMemo(() => {
    return [
      { label: 'Ժամանակով', value: true },
      { label: 'Անժամանակ', value: false },
    ]
  }, [])

  return (
    <>
      <Button type="primary" icon={<LeftOutlined />} style={{ position: 'absolute', left: 12, top: 12, width: 24, height: 24 }} className={styles.backBtn} onClick={() => dispatch(setAppOptions({ currentStage: GAME_STAGES.start }))} />
      <div className={styles.settings}>
        <Form layout="vertical" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Flex vertical gap={20}>
            <Form.Item label="Ժամանակի սահմանափակում">
              <Radio.Group
                block
                options={timeLimitationOptions}
                value={withTimeLimit}
                onChange={onTimeLimitationChange}
                optionType="button"
                buttonStyle="solid"
                disabled={isPending}
              />
            </Form.Item>
            {withTimeLimit && (
              <Form.Item label="Վայրկյան">
                <InputNumber
                  min={1}
                  max={200}
                  value={timeLimit}
                  onChange={(value) => dispatch(setGameSettings({ timeLimit: value ?? 0 }))}
                  style={{ background: 'transparent', width: '100%' }}
                  disabled={isPending}
                />
              </Form.Item>
            )}
          </Flex>
          <Form.Item label="Քանիսից է խաղը">
            <InputNumber
              min={1}
              max={999}
              controls
              value={pointsToWin}
              onChange={(value) => dispatch(setGameSettings({ pointsToWin: value ?? 1 }))}
              style={{ background: 'transparent', width: '100%' }}
              disabled={isPending}
            />
          </Form.Item>
          <Form.Item label="Նվազագույն տառերի քանակը">
            <InputNumber
              min={2}
              max={8}
              controls
              value={minLettersCount}
              onChange={(value) => dispatch(setGameSettings({ minLettersCount: value ?? 3 }))}
              style={{ background: 'transparent', width: '100%' }}
              disabled={isPending}
            />
          </Form.Item>
          {isSingleMode && (
            <Form.Item label="Թեմա">
              <Select
                value={category}
                onChange={handleCategoryChange}
                options={CATEGORIES_OPTIONS}
                disabled={isPending}
                loading={isPending}
              />
            </Form.Item>
          )}
          {isSingleMode && (
            <Form.Item label="Բարդության մակարդակ">
              <Select
                value={difficulty}
                onChange={handleDifficultyChange}
                options={DIFFICULTY_LEVELS_OPTIONS}
                disabled={isPending}
                loading={isPending}
              />
            </Form.Item>
          )}
          <CustomButton loading={isPending} disabled={isStartGameDisabled} onClick={handleStartGameBtnClick}>
            Սկսել խաղը
          </CustomButton>
        </Form>
      </div>
    </>
  )
}
