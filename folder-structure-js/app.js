const folders = [
    {
        name: 'Work',
        contents: [
        {
            name: 'Code',
            contents: [
                {
                    name: 'JS',
                    contents: [],
                    dateCreated: '12/17/2021',
                    id: 4544,
                    level: 3
                },
                {
                    name: 'CSS',
                    contents: [],
                    dateCreated: '12/17/2021',
                    id: 4546,
                    level: 3
                }
            ],
            dateCreated: '11/22/2021',
            id: 387,
            level: 2
        },
        {
            name: 'Meetings',
            contents: [],
            dateCreated: '11/22/2021',
            id: 889,
            level: 2
        },
        {
            name: 'Notes',
            contents: [],
            dateCreated: '11/22/2021',
            id: 3,
            level: 2
        }
        ], 
        dateCreated: '11/22/2021',
        id: 1,
        level: 1
    },
    {
        name: 'Personal',
        contents: [
        {
            name: 'My Music',
            contents: [],
            dateCreated: '11/22/2021',
            id: 4,
            level: 2
        },
        {
            name: 'My Youtube Videos',
            contents: [],
            dateCreated: '11/22/2021',
            id: 9,
            level: 2
        },
        {
            name: 'Random Links',
            contents: [],
            dateCreated: '11/22/2021',
            id: 7,
            level: 2
        }
    ],
        dateCreated: '11/22/2021',
        id: 13,
        level: 1
    },
    {
        name: 'Purchases',
        contents: [
        {
            name: 'Amazon',
            contents: [],
            dateCreated: '11/22/2021',
            id: 90,
            level: 2
        },
        {
            name: 'Zappos',
            contents: [],
            dateCreated: '11/22/2021',
            id: 91,
            level: 2
        },
        {
            name: 'Petco',
            contents: [],
            dateCreated: '11/22/2021',
            id: 79,
            level: 2
        }
    ],
        dateCreated: '11/22/2021',
        id: 12,
        level: 1
    }
];

// WORKING VERSION 1 - up to 2 levels, call inline from body
// const createFolderStructure = arr => {
//     for(let i = 0; i < arr.length; i++) {
//         console.log("- " + folders[i].name);
//         if (folders[i].contents) {
//             for(let j = 0; j < folders[i].contents.length; j++) {
//                 console.log("  + " + folders[i].contents[j].name); 
//             }
//         }
        
//     }
// };


// VERSION 2
// source code: https://codereview.stackexchange.com/questions/252922/pretty-print-directory-structure-in-a-json-recursively


const logFolders = (contents, indentation, prefix = '') => contents
        .map( ({ name, contents }) => Array.isArray(contents) 
        ? prefix + 
        (contents.length ? '- ' : '+ ' )+ name + '\n' + logFolders(contents,  indentation, (prefix || ' ')  + ' '.repeat(indentation)) : prefix + name)
        .join(''), dirStructure = folders, result = logFolders(dirStructure, 2);

console.log(result);
