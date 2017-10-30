var data = {
    1: {
        img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2866654910,66629522&fm=58&s=58243D72475356751C54A9DF000080B3',
        query: 'boy',
        id: 1,
        x: 400 - 150,
        y: 400,
        name: '云朵',
        role: 'core'
    },
    2: {
        img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3185237878,3695400734&fm=58&s=99A7F5177E2172843E542CEF0300C02A',
        query: 'girl',
        id: 2,
        x: 400 + 150,
        y: 400,
        name: '唐一白',
        role: 'core'
    },
    3: {
        img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3028048661,4109321960&fm=58&s=B1704B34674B5351008DEDCF0300F0A1',
        query: 'boy',
        id: 3,
        x: 550,
        y: 250,
        name: '程美',
        role: 'college'
    },
    4: {
        img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2132843061,2562033714&fm=58&s=E1B01798DB32469C1C3071DF0300D0E0',
        query: 'girl',
        id: 4,
        x: 500,
        y: 700,
        name: '林梓',
        role: 'like'
    },
    5: {
        img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3499008174,3580970439&fm=58&s=9D888F5FAD72569424A488DA0300D030',
        query: 'boy',
        id: 5,
        x: 450,
        y: 600,
        name: '林桑',
        role: 'like'
    },
    6: {
        img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3292539815,516725901&fm=58&s=56F20365225367D4D70C31820300E083',
        query: 'girl',
        id: 6,
        x: 600,
        y: 500,
        name: '祁睿峰',
        role: 'friend'
    },
    7: {
        img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1166228090,2892751000&fm=58&s=3D9AA5575D63720534E01CF90300E068',
        query: 'girl',
        id: 7,
        x: 400,
        y: 900,
        name: '向阳阳',
        role: 'friend'
    },
    8: {
        img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3110257825,965114831&fm=58&s=ABB1CB06D4A312AC342CF9A70300A083',
        query: 'girl',
        id: 8,
        x: 300,
        y: 800,
        name: '郑凌晔',
        role: 'friend'
    },
    9: {
        img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2488868808,3924385943&fm=58&s=9320F1A00A32D7FD0710F4AB03005002',
        query: 'girl',
        id: 9,
        x: 300,
        y: 750,
        name: '明天',
        role: 'friend'
    }
};
var link = [
    {
        source: 2,
        target: 1,
        relation: '男女朋友'
    },
    {
        source: 1,
        target: 3,
        relation: '同事'
    },
    {
        source: 4,
        target: 1,
        relation: '喜欢'
    },
    {
        source: 4,
        target: 5,
        relation: '妹妹'
    },
    {
        source: 5,
        target: 2,
        relation: '喜欢'
    },
    {
        source: 2,
        target: 6,
        relation: '对友'
    },
    {
        source: 2,
        target: 7,
        relation: '对友'
    },
    {
        source: 2,
        target: 8,
        relation: '对友'
    },
    {
        source: 9,
        target: 2,
        relation: '对友'
    }
];

module.exports = {
    data: data,
    link: link
};