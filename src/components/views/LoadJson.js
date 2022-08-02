import wantJson from './want';
function LoadJson(){
    // const pleaseJson = wantJson.map((item, index)=>{
    //     return (
    //         <div>

    //         </div>
    //     )
    // })



    console.log('wantJson');
    console.log(wantJson.data.attributes.last_analysis_results);
    return(
        <div>
        </div>
        
    )
}

// function LoadJson() {
//     async function populate() {
//         const requestURL = require('./want.json');
//         populateHeader(requestURL);
//         populateHeroes(requestURL);

//     }

//     function populateHeader() {
//         const header = document.querySelector('header');
//         const myH1 = document.createElement('h1');
//         myH1.textContent = '이제 좀 돼라';
//         header.appendChild(myH1);

//         const myPara = document.createElement('p');
//         header.appendChild(myPara);
//     }

//     function populateHeroes(obj) {
//         const section = document.querySelector('section');
//         const heroes = obj['data']['attributes']['last_analysis_results'];
//         const numHeroes = Object.keys(heroes);

        
//         for (const hero of numHeroes) {

//             const myArticle = document.createElement('article');
//             const myH2 = document.createElement('h2');
//             const myPara1 = document.createElement('p');
//             const myPara2 = document.createElement('p');
//             const myPara3 = document.createElement('p');
//             const myList = document.createElement('ul');
//             // console.log(hero);
//             myH2.textContent = heroes[hero];
//             myPara1.textContent = 'category =' + heroes[hero].category;
//             myPara2.textContent = 'method =' + heroes[hero].method;
//             myPara3.textContent = 'result =' + heroes[hero].result;
            

//             // const superPowers = hero.powers;
//             // for (const power of superPowers) {
//             //     const listItem = document.createElement('li');
//             //     listItem.textContent = power;
//             //     myList.appendChild(listItem);
//             // }

//             myArticle.appendChild(myH2);
//             myArticle.appendChild(myPara1);
//             myArticle.appendChild(myPara2);
//             myArticle.appendChild(myPara3);
//             myArticle.appendChild(myList);

//             section.appendChild(myArticle);
//         }
//     }

//     populate();
//     return (
//         <div>
//             <header>
//             </header>

//             <section>
//             </section>

//         </div>
//     )
// }

export default LoadJson;