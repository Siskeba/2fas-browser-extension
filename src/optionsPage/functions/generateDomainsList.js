//
//  This file is part of the 2FAS Browser Extension (https://github.com/twofas/2fas-browser-extension)
//  Copyright © 2023 Two Factor Authentication Service, Inc.
//  Contributed by Grzegorz Zając. All rights reserved.
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program. If not, see <https://www.gnu.org/licenses/>
//

/* global alert */

const browser = require('webextension-polyfill');
const { createElement, createSVGElement, createTextElement } = require('../../partials/DOMElements');
const generateEmptyDomainRow = require('./generateEmptyDomainRow');
const S = require('../../selectors');
const disconnectSVG = require('../../images/page-icons/disconnect.svg');

const generateDomainsList = list => {
  if (!list) {
    list = [];
  }

  const tbody = document.querySelector(S.optionsPage.autoSubmit.list);

  if (list.length === 0) {
    generateEmptyDomainRow(tbody);
  }

  list.map(d => {
    let t = {
      tr: null,
      td: [null, null],
      domain: null,
      button: null,
      svg: null
    };

    t.tr = createElement('tr');
    t.tr.dataset.deviceId = d.domain;

    t.td[0] = createElement('td');
    t.td[0].setAttribute('data-before-i18n', browser.i18n.getMessage('domain'));
    t.domain = createTextElement('span', d.domain);

    t.td[0].appendChild(t.domain);
    t.tr.appendChild(t.td[0]);

    t.td[1] = createElement('td');
    t.td[1].setAttribute('data-before-i18n', browser.i18n.getMessage('optionsRemoveFromExcluded'));
    t.button = createElement('button');
    t.button.dataset.domain = d.domain;
    t.button.addEventListener('click', () => { alert('elo'); });

    t.svg = createSVGElement(disconnectSVG);
    t.button.appendChild(t.svg);

    t.td[1].appendChild(t.button);
    t.tr.appendChild(t.td[1]);

    tbody.appendChild(t.tr);
    t = null;

    return d;
  });
};

module.exports = generateDomainsList;
