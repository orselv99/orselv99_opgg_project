const path = require('path');
const fs = require('fs');

if (!process.env['CODESIGN_PATH']) {
  const certPath = path.join(__dirname, 'codesign.pfx');
  const certExists = fs.existsSync(certPath);

  if (certExists) {
    process.env['CODESIGN_PATH'] = certPath;
  }
}

const EXECUTABLE_NAME = 'orselv99_opgg_project';
const VERSION = '1.0.0';
const AUTHORS = 'orseL';
const COPYRIGHT = `Copyright (C) 2023 ${AUTHORS} All Rights Reserved.`;
const DESCRIPTION = 'opgg project';
const ICON_PATH = 'assets/icon/app.ico';

module.exports = {
  packagerConfig: {
    icon: `./${ICON_PATH}`,
    // StringFileInfo
    name: DESCRIPTION,								// 파일 설명, 제품 이름
    executableName: EXECUTABLE_NAME,	// 실행파일 이름
    appVersion: VERSION,						  // 제품 버전
    appCopyright: COPYRIGHT,					// 저작권
    buildVersion: VERSION,					  // 파일 버전
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: EXECUTABLE_NAME,
        exe: `${EXECUTABLE_NAME}.exe`,
        setupExe: `${EXECUTABLE_NAME}_setup.exe`,
        setupIcon: `./${ICON_PATH}`,
        version: VERSION,
        authors: AUTHORS,
        copyright: COPYRIGHT,
        description: DESCRIPTION,																				                    // 파일 설명, 제품 이름
        iconUrl: `file://C:/Users/orsel/Documents/Repo/orselv99_opgg_project/${ICON_PATH}`,	// 제어판 > 프로그램 설치/제거 에 표시되는 아이콘
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
      config: {}
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './config/webpack.main.config.js',
        renderer: {
          config: './config/webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/renderer/index.html',
              js: './src/renderer/index.tsx',
              name: 'main_window',
              preload: {
                js: './src/renderer/preload.ts',
              },
            },
          ],
        },
      }
    }
  ],
};
