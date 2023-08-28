const head = document.getElementById("header");
const nav = document.getElementById("Navigate");
const all_cards = document.getElementById("all_cards");
const input = document.getElementById("Search1");
const main = document.getElementById("main");
const productsLine = document.getElementById("products");
const mainBoard = document.getElementById("mainBoard");
const homePage = document.getElementById("home");
import { fetchData } from "./getData.js";
let data;

const d_none = (item) => {
  item.style.display = "none";
};

const d_block = (item) => {
  item.style.display = "block";
};

const inputValue = (e) => {
  console.log(e.target.value);
};

const d_flex = (item) => {
  item.style.display = "flex";
};

const create_Element = (type, father, node = "") => {
  const NEW = document.createElement(type);
  NEW.innerHTML = node;
  father.appendChild(NEW);
  return NEW;
};

const openCard = (card) => {
  d_none(mainBoard);
  data.forEach((element) => {
    if (card.id == element.id) {
      console.log(element);
      createOneCard(element);
    }
  });
};

const createCard = (data) => {
  const card = create_Element("div", all_cards);
  card.className = `cards ${data.category} All_Products`;
  card.id = data.id;
  const D_IMG = create_Element("div", card);
  D_IMG.className = "img_box";
  const img = create_Element("img", D_IMG);
  img.src = data.image;
  img.alt = "product img";
  img.width = 150;
  img.height = 150;
  img.className = "img";
  img.id = data.id;

  card.addEventListener("click", (event) => {
    if (event.target.id !== `delete${card.id}`) {
      openCard(card);
      console.log(card);
    }
  });

  const TITLE_CUBE = create_Element("div", card);
  const TITLE = create_Element("p", TITLE_CUBE, data.title);
  TITLE.className = "title";
  const line = create_Element("p", TITLE_CUBE);
  line.className = "line";
  const AMOUNT = create_Element("div", TITLE_CUBE);
  AMOUNT.className = "amount";
  const add1 = create_Element("i", AMOUNT, "exposure_plus_1");
  add1.className = "material-icons hover";
  add1.id = `add${data.id}`;
  const EXISTS = create_Element("p", AMOUNT, "0");
  EXISTS.className = "exists";
  const DELETE1 = create_Element("i", AMOUNT, "exposure_neg_1");
  DELETE1.className = "material-icons hover";
  DELETE1.id = `neg${data.id}`;
  const icons = create_Element("div", TITLE_CUBE);
  icons.className = "icons";
  icons.id = `icons${data.id}`;
  const DELETE = create_Element("i", icons, "delete");
  DELETE.className = "material-icons hover";
  DELETE.id = `delete${data.id}`;
  const edited = create_Element("i", icons, "create");
  edited.className = "material-icons hover";
  edited.id = `edited${data.id}`;
};

const createOneCard = (data) => {
  const NEW_CARD = create_Element("div", main);
  NEW_CARD.id = "productMain";
  const firstLine = create_Element("div", NEW_CARD);
  firstLine.id = "firstLine";
  const icons = create_Element("div", firstLine);
  icons.id = "iconsProduct";
  const arrow_back = create_Element("i", icons, "arrow_back");
  arrow_back.className = "material-icons";
  const home = create_Element("i", icons, "home");
  home.className = "material-icons";
  home.addEventListener("click", () => {
    d_block(mainBoard);
    NEW_CARD.remove();
  });
  const create = create_Element("i", icons, "create");
  create.className = "material-icons";
  create.id = `create${data.id}`;
  const page = create_Element("div", firstLine, "Product Page");
  page.id = "ProductPage";
  const empty = create_Element("div", firstLine);
  const PRODUCT = create_Element("div", NEW_CARD);
  PRODUCT.id = "productBox";
  const IMG = create_Element("div", PRODUCT);
  IMG.id = "imgBox";
  const img = create_Element("img", IMG);
  img.id = "PR_img";
  img.src = data.image;
  img.alt = "product img";
  img.width = 450;
  const Details = create_Element("div", PRODUCT);
  Details.id = "Details";
  const Title = create_Element("h3", Details, "TITLE:");
  const title = create_Element("p", Details, data.title);
  const Description = create_Element("h3", Details, "DESCRIPTION:");
  const description = create_Element("p", Details, data.description);
  const Capacity = create_Element("h3", Details, "CATEGORY:");
  const capacity = create_Element("p", Details, data.category);
  const Price = create_Element("h3", Details, "PRICE:");
  const price = create_Element("p", Details, data.price);
  const Quantity = create_Element("h3", Details, "QUANTITY:");
  const quantity = create_Element("p", Details, Math.round(Math.random() * 9));
};
const createCards = async () => {
  data = await fetchData();
  data.forEach((element) => {
    createCard(element);
  });
};

const displayFilteredData = (filteredData) => {
  all_cards.innerHTML = "";

  if (filteredData.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No results found.";
    all_cards.appendChild(noResults);
  } else {
    filteredData.forEach((item) => {
      createCard(item);
    });
  }
};

const filterData = (searchTerm) => {
  const filteredData = data.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  displayFilteredData(filteredData);
};
const react = (event) => {
  const all = document.getElementsByClassName("All_Products");
  const wonted = document.getElementsByClassName(event);
  for (let index = 0; index < all.length; index++) {
    d_none(all[index]);
  }
  for (let i = 0; i < wonted.length; i++) {
    d_block(wonted[i]);
  }
};

addEventListener("load", () => createCards());

nav.addEventListener("click", (event) => {
  react(event.target.id);
});

input.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  filterData(searchTerm);
});

homePage.addEventListener("click", () => {
  const productMain = document.getElementById("productMain");
  if (productMain !== null) {
    productMain.remove();
  }

  d_block(mainBoard);
  react("All_Products");
});
