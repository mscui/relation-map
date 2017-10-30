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
        src: '/static/image/1.jpeg', // 人物头像图片，尺寸1:1（最好是静态图片，英文命名）
        id: '1', // 人物ID
        pos: '1', // 人物位置
        role: '1', // 角色定位：主角：1，其他角色：2（暂时只支持单主角）
        name: '1' // 角色名称（根据id的数字来填写），例：梅长苏
    }
*/
export const manifest = [{
    src: '/static/image/1.jpeg',
    id: '1',
    pos: '1',
    role: '1',
    name: '1'
},{
    src: '/static/image/2.jpeg',
    id: '11',
    pos: '11',
    role: '2',
    name: '11'
},{
    src: '/static/image/3.jpeg',
    id: '12',
    pos: '12',
    role: '2',
    name: '12'
},{
    src: '/static/image/4.jpeg',
    id: '13',
    pos: '13',
    role: '2',
    name: '13'
},{
    src: '/static/image/1.jpeg',
    id: '14',
    pos: '14',
    role: '2',
    name: '14'
},{
    src: '/static/image/2.jpeg',
    id: '15',
    pos: '15',
    role: '2',
    name: '15'
},{
    src: '/static/image/4.jpeg',
    id: '16',
    pos: '16',
    role: '2',
    name: '16'
},{
    src: '/static/image/4.jpeg',
    id: '111',
    pos: '111',
    role: '2',
    name: '111'
},{
    src: '/static/image/4.jpeg',
    id: '112',
    pos: '112',
    role: '2',
    name: '112'
},{
    src: '/static/image/4.jpeg',
    id: '116',
    pos: '116',
    role: '2',
    name: '116'
},{
    src: '/static/image/4.jpeg',
    id: '122',
    pos: '122',
    role: '2',
    name: '122'
},{
    src: '/static/image/4.jpeg',
    id: '133',
    pos: '133',
    role: '2',
    name: '133'
},{
    src: '/static/image/4.jpeg',
    id: '123',
    pos: '123',
    role: '2',
    name: '123'
},{
    src: '/static/image/4.jpeg',
    id: '134',
    pos: '134',
    role: '2',
    name: '134'
},{
    src: '/static/image/4.jpeg',
    id: '155',
    pos: '155',
    role: '2',
    name: '155'
},{
    src: '/static/image/4.jpeg',
    id: '145',
    pos: '145',
    role: '2',
    name: '145'
},{
    src: '/static/image/4.jpeg',
    id: '156',
    pos: '156',
    role: '2',
    name: '156'
},{
    src: '/static/image/4.jpeg',
    id: '144',
    pos: '144',
    role: '2',
    name: '144'
},{
    src: '/static/image/4.jpeg',
    id: '166',
    pos: '166',
    role: '2',
    name: '166'
},{
    src: '/static/image/4.jpeg',
    id: '1222',
    pos: '1222',
    role: '2',
    name: '1222'
},{
    src: '/static/image/4.jpeg',
    id: '1454',
    pos: '1454',
    role: '2',
    name: '1454'
},{
    src: '/static/image/4.jpeg',
    id: '1223',
    pos: '1223',
    role: '2',
    name: '1223'
},{
    src: '/static/image/4.jpeg',
    id: '1221',
    pos: '1221',
    role: '2',
    name: '1221'
},{
    src: '/static/image/4.jpeg',
    id: '12211',
    pos: '12211',
    role: '2',
    name: '12211'
},{
    src: '/static/image/4.jpeg',
    id: '1121',
    pos: '1121',
    role: '2',
    name: '1121'
},{
    src: '/static/image/4.jpeg',
    id: '1555',
    pos: '1555',
    role: '2',
    name: '1555'
},{
    src: '/static/image/4.jpeg',
    id: '1566',
    pos: '1566',
    role: '2',
    name: '1566'
},{
    src: '/static/image/4.jpeg',
    id: '1332',
    pos: '1332',
    role: '2',
    name: '1332'
},{
    src: '/static/image/4.jpeg',
    id: '1333',
    pos: '1333',
    role: '2',
    name: '1333'
},{
    src: '/static/image/4.jpeg',
    id: '13323',
    pos: '13323',
    role: '2',
    name: '13323'
},{
    src: '/static/image/4.jpeg',
    id: '13322',
    pos: '13322',
    role: '2',
    name: '13322'
},{
    src: '/static/image/4.jpeg',
    id: '1455',
    pos: '1455',
    role: '2',
    name: '1455'
},{
    src: '/static/image/4.jpeg',
    id: '1444',
    pos: '1444',
    role: '2',
    name: '1444'
},{
    src: '/static/image/4.jpeg',
    id: '14554',
    pos: '14554',
    role: '2',
    name: '14554'
},{
    src: '/static/image/4.jpeg',
    id: '14555',
    pos: '14555',
    role: '2',
    name: '14555'
},{
    src: '/static/image/4.jpeg',
    id: '14544',
    pos: '14544',
    role: '2',
    name: '14544'
},{
    src: '/static/image/4.jpeg',
    id: '1443',
    pos: '1443',
    role: '2',
    name: '1443'
},{
    src: '/static/image/4.jpeg',
    id: '15551',
    pos: '15551',
    role: '2',
    name: '15551'
},{
    src: '/static/image/4.jpeg',
    id: '145445',
    pos: '145445',
    role: '2',
    name: '145445'
},{
    src: '/static/image/4.jpeg',
    id: '155516',
    pos: '155516',
    role: '2',
    name: '155516'
},{
    src: '/static/image/4.jpeg',
    id: '15556',
    pos: '15556',
    role: '2',
    name: '15556'
},{
    src: '/static/image/4.jpeg',
    id: '1334',
    pos: '1334',
    role: '2',
    name: '1334'
},{
    src: '/static/image/4.jpeg',
    id: '155566',
    pos: '155566',
    role: '2',
    name: '155566'
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
    relation: '1',
    isCore: true
},{
    source: '1',
    target: '12',
    pos: '2',
    relation: '2',
    isCore: true
},{
    source: '1',
    target: '13',
    pos: '3',
    relation: '3',
    isCore: true
},{
    source: '1',
    target: '14',
    pos: '4',
    relation: '4',
    isCore: true
},{
    source: '1',
    target: '15',
    pos: '5',
    relation: '5',
    isCore: true
},{
    source: '1',
    target: '16',
    pos: '6',
    relation: '6',
    isCore: true
},{
    source: '16',
    target: '166',
    pos: '6',
    relation: '朋友',
    isCore: true
},{
    source: '12',
    target: '122',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '13',
    target: '133',
    pos: '3',
    relation: '朋友',
    isCore: false
},{
    source: '133',
    target: '1332',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '14',
    target: '145',
    pos: '5',
    relation: '朋友',
    isCore: false
},{
    source: '15',
    target: '155',
    pos: '5',
    relation: '朋友',
    isCore: false
},{
    source: '15',
    target: '145',
    pos: '4',
    relation: '朋友',
    isCore: false
},{
    source: '144',
    target: '145',
    pos: '3',
    relation: '朋友',
    isCore: false
},{
    source: '144',
    target: '1443',
    pos: '3',
    relation: '朋友',
    isCore: false
},{
    source: '1443',
    target: '1334',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '145',
    target: '1454',
    pos: '4',
    relation: '朋友',
    isCore: false
},{
    source: '1454',
    target: '14544',
    pos: '4',
    relation: '朋友',
    isCore: false
},{
    source: '1454',
    target: '144',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '145',
    target: '1455',
    pos: '5',
    relation: '朋友',
    isCore: false
},{
    source: '155',
    target: '1555',
    pos: '5',
    relation: '朋友',
    isCore: false
},{
    source: '155',
    target: '1455',
    pos: '4',
    relation: '朋友',
    isCore: false
},{
    source: '155',
    target: '145',
    pos: '3',
    relation: '朋友',
    isCore: false
},{
    source: '1555',
    target: '15556',
    pos: '6',
    relation: '朋友',
    isCore: false
},{
    source: '15556',
    target: '15551',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '15551',
    target: '1555',
    pos: '1',
    relation: '朋友',
    isCore: false
},{
    source: '156',
    target: '15',
    pos: '3',
    relation: '朋友',
    isCore: false
}];

/* 热门人物弹框展示所需数据 */
/* 每个字段含义如下：
    {
        src: '/static/image/1.jpeg', // 人物头像图片，尺寸1:1（最好是静态图片，英文命名）
        id: '1',
        pos: '1',
        role: '1', // 角色定位：主角：1，其他角色：2（暂时只支持单主角）
        name: '1' // 角色名称（根据id的数字来填写），例：梅长苏
    }
*/
export const popularNode = [{
    src: '/static/image/1.jpeg',
    id: '1',
    pos: '1',
    role: '1',
    name: '1'
},{
    src: '/static/image/4.jpeg',
    id: '145',
    pos: '145',
    role: '2',
    name: '145'
},{
    src: '/static/image/4.jpeg',
    id: '1454',
    pos: '1454',
    role: '2',
    name: '1454'
},{
    src: '/static/image/4.jpeg',
    id: '1555',
    pos: '1555',
    role: '2',
    name: '1555'
},{
    src: '/static/image/4.jpeg',
    id: '1332',
    pos: '1332',
    role: '2',
    name: '1332'
},{
    src: '/static/image/4.jpeg',
    id: '1334',
    pos: '1334',
    role: '2',
    name: '1334'
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
        src: '/static/image/1.jpeg'
    }
*/

export const roleText = {
    '1': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1',
        roleName: '1',
        src: '/static/image/1.jpeg'
    },
    '11': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '11',
        roleName: '11',
        src: '/static/image/2.jpeg'
    },
    '12': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '12',
        roleName: '12',
        src: '/static/image/3.jpeg'
    },
    '13': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '13',
        roleName: '13',
        src: '/static/image/4.jpeg'
    },
    '14': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '14',
        roleName: '14',
        src: '/static/image/4.jpeg'
    },
    '15': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '15',
        roleName: '15',
        src: '/static/image/4.jpeg'
    },
    '16': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '16',
        roleName: '16',
        src: '/static/image/4.jpeg'
    },
    '122': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '122',
        roleName: '122',
        src: '/static/image/4.jpeg'
    },
    '133': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '133',
        roleName: '133',
        src: '/static/image/4.jpeg'
    },
    '1332': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1332',
        roleName: '1332',
        src: '/static/image/4.jpeg'
    },
    '156': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '156',
        roleName: '156',
        src: '/static/image/4.jpeg'
    },
    '15556': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '15556',
        roleName: '15556',
        src: '/static/image/4.jpeg'
    },
    '15551': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '15551',
        roleName: '15551',
        src: '/static/image/1.jpeg'
    },
    '1555': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1555',
        roleName: '1555',
        src: '/static/image/4.jpeg'
    },
    '155': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '155',
        roleName: '155',
        src: '/static/image/1.jpeg'
    },
    '1455': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1455',
        roleName: '1455',
        src: '/static/image/1.jpeg'
    },
    '145': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '145',
        roleName: '145',
        src: '/static/image/1.jpeg'
    },
    '1454': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1454',
        roleName: '1454',
        src: '/static/image/1.jpeg'
    },
    '144': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '144',
        roleName: '144',
        src: '/static/image/1.jpeg'
    },
    '14544': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '14544',
        roleName: '14544',
        src: '/static/image/1.jpeg'
    },
    '1443': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1443',
        roleName: '1443',
        src: '/static/image/1.jpeg'
    },
    '1334': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1334',
        roleName: '1334',
        src: '/static/image/1.jpeg'
    }
}