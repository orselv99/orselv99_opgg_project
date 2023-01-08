import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import OPGG from '../../../assets/images/icon-02-logo-op-gg-48-px-primary.svg';
import { RootState } from '../redux';
import { setVisiting } from '../redux/common';

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #6c61ff;
  margin-bottom: 24px;
  cursor: pointer;
  -webkit-app-region: no-drag;

`
const Indicator = styled.div<{ isChecked: boolean }>`
  position: absolute;
  width: 4px;
  height: 24px;
  left: 56px;
  border-radius: 8px;
  ${(props) => props.isChecked === true && 'background-color: #6c61ff;'}
`;
const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  cursor: pointer;
  -webkit-app-region: no-drag;

  &:hover ${Indicator} {
    background-color: #6c61ff;
  }
`;
const Item = styled.div<{ default: string, hover: string }>`
  width: 60px;
  height: 60px;
  background-image: url(${(props) => props.default});
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-image: url(${(props) => props.hover});
  }
`;

export const LeftBar = () => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.common.games);

  useEffect(() => {
    games.forEach((value) => {
      if (value.isVisiting === true) {
        onClickGame(value.type);
      }
    })
  }, [games]);

  const onClickLogo = () => {
    window.ipcRenderer.send(
      'MAIN_WINDOW',
      {
        type: 'onClickLogo'
      });
  }
  const onClickGame = (type: GameType) => {
    dispatch(setVisiting(type));
  };

  return (
    <div>
      <Logo>
        <img alt='logo' src={OPGG} onClick={onClickLogo} />
      </Logo>
      {
        games.map((value) => {
          return (
            <ItemWrapper key={`game_${String(value.type)}`}>
              <NavLink
                to={`/${String(value.type)}`}
                onClick={() => onClickGame(value.type)}
                draggable={false} >
                <Item
                  default={value.isVisiting === true ? value.hover : value.default}
                  hover={value.hover} />
              </NavLink>
              <Indicator isChecked={value.isVisiting} />
            </ItemWrapper>
          );
        })
      }
    </div>
  )
}