/*
    需要替换的字段就是所有对映的name，src和text字段，
    一共有4个变量里的字段需要替换，popularNode,roleText,manifest,linesData
    popularNode: 热门人物上滑弹框展示所需数据;
    roleText: 上滑弹框所需数据;
    mainfest: 所有人物点所需数据;
    linesData: 所有关系数据;
*/


/* 人物点所需数据 */
/* 每个字段含义如下：
    {
        src: '/static/image/4.jpeg', // 人物头像图片，尺寸1:1（最好是静态图片，英文命名）
        id: '1', // 人物ID
        pos: '1', // 人物位置
        role: '1', // 角色定位：主角：1，其他角色：2（暂时只支持单主角）
        name: '芈月' // 角色名称（根据id的数字来填写），例：梅长苏
    }
*/
export const manifest = [{
    src: '/static/image/4.jpeg',
    id: '1',
    pos: '1',
    role: '1',
    name: '芈月'
},{
    src: '/static/image/4.jpeg',
    id: '11',
    pos: '11',
    role: '2',
    name: '黄歇'
},{
    src: '/static/image/4.jpeg',
    id: '12',
    pos: '12',
    role: '2',
    name: '芈姝'
},{
    src: '/static/image/4.jpeg',
    id: '13',
    pos: '13',
    role: '2',
    name: '嬴驷'
},{
    src: '/static/image/4.jpeg',
    id: '14',
    pos: '14',
    role: '2',
    name: '孟嬴'
},{
    src: '/static/image/4.jpeg',
    id: '15',
    pos: '15',
    role: '2',
    name: '瞿丽'
},{
    src: '/static/image/4.jpeg',
    id: '16',
    pos: '16',
    role: '2',
    name: '佣瑞'
},{
    src: '/static/image/4.jpeg',
    id: '122',
    pos: '122',
    role: '2',
    name: '孟昭氏'
},{
    src: '/static/image/4.jpeg',
    id: '112',
    pos: '112',
    role: '2',
    name: '玳瑁'
},{
    src: '/static/image/4.jpeg',
    id: '123',
    pos: '123',
    role: '2',
    name: '嬴荡'
},{
    src: '/static/image/4.jpeg',
    id: '133',
    pos: '133',
    role: '2',
    name: '嬴稷'
},{
    src: '/static/image/4.jpeg',
    id: '1335',
    pos: '1335',
    role: '2',
    name: '嬴华'
},{
    src: '/static/image/4.jpeg',
    id: '134',
    pos: '134',
    role: '2',
    name: '魏琰'
},{
    src: '/static/image/4.jpeg',
    id: '1334',
    pos: '1334',
    role: '2',
    name: '樊少使'
}];

/* 关系所需数据 */
/* 每个字段含义如下：
    {
        source: '1', // 关系起始点数据
        target: '11', // 关系结束点数据
        pos: '1', // 关系位置
        relation: '朋友', // 关系类型
        isCore: true // 是不是主线
    }
*/
export const linesData = [{
    source: '1',
    target: '11',
    pos: '1',
    relation: '初恋',
    isCore: true
},{
    source: '1',
    target: '12',
    pos: '2',
    relation: '姐妹',
    isCore: true
},{
    source: '1',
    target: '13',
    pos: '3',
    relation: '宠妃',
    isCore: true
},{
    source: '1',
    target: '14',
    pos: '4',
    relation: '好友',
    isCore: true
},{
    source: '1',
    target: '15',
    pos: '5',
    relation: '帮手',
    isCore: true
},{
    source: '1',
    target: '16',
    pos: '6',
    relation: '情人',
    isCore: true
},{
    source: '13',
    target: '133',
    pos: '3',
    relation: '妃子',
    isCore: true
},{
    source: '13',
    target: '123',
    pos: '2',
    relation: '父子',
    isCore: false
},{
    source: '13',
    target: '134',
    pos: '4',
    relation: '父子',
    isCore: false
},{
    source: '12',
    target: '122',
    pos: '2',
    relation: '应女',
    isCore: false
},{
    source: '12',
    target: '112',
    pos: '1',
    relation: '主仆',
    isCore: false
},{
    source: '123',
    target: '133',
    pos: '4',
    relation: '争皇位',
    isCore: false
},{
    source: '134',
    target: '1335',
    pos: '4',
    relation: '母子',
    isCore: false
},{
    source: '134',
    target: '1334',
    pos: '3',
    relation: '对抗',
    isCore: false
}];

/* 热门人物弹框展示所需数据 */
/* 每个字段含义如下：
    {
        src: '/static/image/4.jpeg', // 人物头像图片，尺寸1:1（最好是静态图片，英文命名）
        id: '1',
        pos: '1',
        role: '1', // 角色定位：主角：1，其他角色：2（暂时只支持单主角）
        name: '芈月' // 角色名称（根据id的数字来填写），例：梅长苏
    }
*/
export const popularNode = [{
    src: '/static/image/4.jpeg',
    id: '123',
    pos: '123',
    role: '2',
    name: '嬴荡'
},{
    src: '/static/image/4.jpeg',
    id: '15',
    pos: '15',
    role: '2',
    name: '佣瑞'
}];

/* 上滑弹框所需数据 */
/* 每个字段含义如下：
    {
        // 每个角色的具体介绍
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        // 每个角色名称（根据rolaName数字填写）
        name: '梅长苏',
        roleName: '1',
        // 人物头像图片地址（同上即可）
        src: '/static/image/4.jpeg'
    }
*/

export const roleText = {
    '1': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '孙俪',
        roleName: '芈月',
        src: '/static/image/4.jpeg'
    },
    '11': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '黄歇',
        roleName: '黄歇',
        src: '/static/image/4.jpeg'
    },
    '12': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '芈姝',
        roleName: '芈姝',
        src: '/static/image/4.jpeg'
    },
    '13': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '嬴驷',
        roleName: '嬴驷',
        src: '/static/image/4.jpeg'
    },
    '14': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '孟嬴',
        roleName: '孟嬴',
        src: '/static/image/4.jpeg'
    },
    '15': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '瞿丽',
        roleName: '瞿丽',
        src: '/static/image/4.jpeg'
    },
    '16': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '佣瑞',
        roleName: '佣瑞',
        src: '/static/image/4.jpeg'
    },
    '112': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '玳瑁',
        roleName: '玳瑁',
        src: '/static/image/4.jpeg'
    },
    '133': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '嬴稷',
        roleName: '嬴稷',
        src: '/static/image/4.jpeg'
    },
    '123': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '嬴荡',
        roleName: '嬴荡',
        src: '/static/image/4.jpeg'
    },
    '122': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '孟昭氏',
        roleName: '孟昭氏',
        src: '/static/image/4.jpeg'
    },
    '134': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '魏琰',
        roleName: '魏琰',
        src: '/static/image/4.jpeg'
    },
    '1334': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '樊少使',
        roleName: '樊少使',
        src: '/static/image/4.jpeg'
    },
    '1335': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '赢华',
        roleName: '赢华',
        src: '/static/image/4.jpeg'
    }
}
// 最长路径
export const level = 3;
export const mainRoleXRatio = 0.4;
export const mainRoleYRatio = 0.25;