import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
// 이미지
import Close from '../../../assets/images/icon-01-basic-16-px-close.svg';
import Maximize from '../../../assets/images/icon-01-basic-16-px-maximize.svg';
import Minimize from '../../../assets/images/icon-01-basic-16-px-minimize.svg';
import Refresh from '../../../assets/images/icon-01-basic-16-px-refresh.svg';
import { setCurrentGameType, setMaximizeState, setVisiting } from '../redux/common';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  margin: 6px 12px 6px 8px;
`
const RefreshButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  -webkit-app-region: no-drag;
`
const RefreshKeyFrames = keyframes`
  100% {
    transform: rotate(360deg);
  }
`
const RotationAnimation = () => css`
  ${RefreshKeyFrames} 3s infinite linear;
`
const RefreshIcon = styled.img<{ isClicked: boolean }>`
  animation: ${(props) => props.isClicked === true && RotationAnimation()}
`
const RefreshLabel = styled.label`
  height: 16px;
  margin: 0 0 0 2px;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.2px;
  text-align: center;
  color: #8892a1;
  -webkit-user-select: none;
  cursor: pointer;
`
const ControlBoxWrapper = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`
const ControlBoxInsideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(136, 146, 161, 0.2);
  }
  &:active {
    background-color: rgba(136, 146, 161, 0.4);
  }
`
const Rectangle = styled.div`
  width: 100%;
  height: 1px;
  background-color: #202530;
`;

type ControlButton = {
  alt: string;
  src: string;
  onClick: React.MouseEventHandler;
}

export const TopBar = () => {
  const dispatch = useDispatch();
  const [controlBoxes, setControlBoxes] = useState<ControlButton[]>([]);
  const [refresh, setRefresh] = useState(false);

  // 우측 control box
  useEffect(() => {
    setControlBoxes([
      {
        alt: 'minimize',
        src: Minimize,
        onClick: () => window.ipcRenderer.send(
          'MAIN_WINDOW',
          {
            type: 'onClickMinimize',
          }),
      },
      {
        alt: 'maximize',
        src: Maximize,
        onClick: () => window.ipcRenderer.send(
          'MAIN_WINDOW',
          {
            type: 'onClickMaximize',
          }),
      },
      {
        alt: 'close',
        src: Close,
        onClick: () => window.ipcRenderer.send(
          'MAIN_WINDOW',
          {
            type: 'onClickClose'
          }),
      }
    ]);

    window.ipcRenderer.on('RENDERER_TOPBAR', (event, args) => {
      const arg: IPCValue = args;
      switch (arg.type) {
        case 'isMaximized':
          // main process 로 부터 상태확인하여 max 상태일때 rounded-corner 를 제거
          dispatch(setMaximizeState(arg.value));
          break;
      }
    });
  }, []);

  const onClickRefresh = () => {
    // refresh animation
    setRefresh(true);

    // currentGame visit 초기화
    dispatch(setVisiting('NONE'));
    dispatch(setCurrentGameType('NONE'));

    // refresh 아이콘 rotation interval 이 끝나면 animation 멈춤
    setTimeout(() => {
      setRefresh(false);
    }, 3000);
  }

  return (
    <>
      <Wrapper>
        <NavLink
          to={'/'}
          onClick={onClickRefresh}
          draggable={false}
          style={{ textDecorationLine: 'none' }}
        >
          <RefreshButton>
            <RefreshIcon alt='refresh' src={Refresh} isClicked={refresh} />
            <RefreshLabel>
              리로딩
            </RefreshLabel>
          </RefreshButton>
        </NavLink>
        <ControlBoxWrapper>
          {
            // control boxes 배치
            controlBoxes.map((value) => {
              return (
                <ControlBoxInsideWrapper key={`control-box-${value.alt}`} >
                  <img alt={value.alt} src={value.src} onClick={value.onClick} />
                </ControlBoxInsideWrapper>
              )
            })
          }
        </ControlBoxWrapper>
      </Wrapper>
      <Rectangle />
    </>
  )
}