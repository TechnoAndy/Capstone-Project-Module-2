/* eslint-disable template-curly-spacing */
/* eslint-disable indent */
import './style.css';
import showPopup from './modules/popupwindow.js';
import { getLikes, postLikes } from './modules/likes.js';
import countMeals from './mealscounter.js';

const url = ('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2yUXOXfEoNKm2RSgRRdh/likes/');
const container = document.getElementById('recipe-section');

const items = async () => {
  try {
    fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=e',
    ).then((res) => res.json()).then((data) => {
      data.meals.forEach((element) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        container.appendChild(cardDiv);

        const title = document.createElement('h1');
        title.classList.add('title');
        cardDiv.appendChild(title);

        const img = document.createElement('img');
        img.setAttribute('src', ` ${element.strMealThumb}`);
        img.className = 'images';
        cardDiv.appendChild(img);

        const btnLikes = document.createElement('button');
          btnLikes.id = `${element.idMeal}`;
          btnLikes.className = 'like-btn';
          cardDiv.appendChild(btnLikes);

        const heartIcon = document.createElement('i');
        heartIcon.className = 'fa-regular fa-heart';
        btnLikes.appendChild(heartIcon);

        const abc = document.createElement('span');
        abc.className = 'like-count';
        btnLikes.appendChild(abc);

        const button = document.createElement('button');
      button.classList.add('comment-btn');
      button.innerText = 'Comments';
      cardDiv.appendChild(button);
      button.addEventListener('click', () => {
        showPopup(element);
      });
      document.getElementById('recipe-section').appendChild(cardDiv);

         getLikes().then((x) => {
          x.forEach((y) => {
            if (y.item_id === element.idMeal) {
              abc.innerHTML = `${y.likes} Likes`;
            }
          });
         });

         const display = () => {
            btnLikes.addEventListener('click', (e) => {
              postLikes(url, btnLikes.id);
              e.target.nextSibling.innerHTML = `${parseInt(e.target.nextSibling.innerHTML, 10) + 1 } Likes`;
            });
          };
          display();
          const btn2 = document.querySelectorAll('.like-btn');
btn2.forEach(() => {
});
      });
      document.querySelector('#nav-items').innerHTML += `<li class="item">
      <a
        class="nav-link "
        href="#recipe-section"
        id="recipesSection"
        >Recipes ${countMeals(container)}</a>
      </li>`;
    }); return 1;
  } catch (error) {
    return error;
  }
};

items();