const body = document.querySelector("body");

class Loader {
  constructor(parent) {
    this._parent = parent;
    this._loading = false;
  }

  _clearContainer() {
    this._parent.innerHTML = "";
  }

  _createLoading() {
    const loading = document.createElement("div");

    loading.textContent = "Loading...";

    this._clearContainer();
    this._parent.appendChild(loading);
  }

  loadData(url, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onprogress = () => {
      if (xhr.readyState === 3) {
        this._loading = true;

        this._createLoading();
      }
    };

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        setTimeout(() => {
          // pending for test
          if (xhr.status === 200) {
            this._loading = false;
            this._clearContainer();

            successCallback(
              this._parent,
              this._loading,
              JSON.parse(xhr.responseText)
            );
          }
        }, 5000);
      }
    };

    xhr.onerror = () => {
      this._loading = false;
      this._clearContainer();
      errorCallback();
    };

    xhr.send();
  }
}

// loadLanguages(
//   "https://translation.googleapis.com/language/translate/v2/languages?key=AIzaSyDlhTSjr7jL4aS5i_o5EKTxx4qOcZgSIrM"
// );

const successCallback = (container, loading, content) => {
  if (!loading) {
    content.forEach((element, index) => {
      const el = document.createElement("div");
      el.textContent = `${index + 1}) ${element.body}`;

      container.appendChild(el);
    });
  }
};

const errorCallback = (content) => {
  console.log(content);
};

const parent = document.createElement("div");
const postContainer = new Loader(parent);

body.appendChild(parent);

postContainer.loadData(
  "https://jsonplaceholder.typicode.com/posts",
  successCallback,
  errorCallback
);
