# Instruction for project

## Start Dev Project:

1. npm install
2. npm run dev

## Start Build Project:

1. npm run build

## Callback for any select:

```javascript
document.addEventListener("selectCallback", function (e) {
    const currentSelect = e.detail.select;
});
```

## Open any popup

```javascript
popupOpen(idPopup);
```

## Open and close bigLoader

Example of big Loader is on dashboard.html css class of element is .big-loader

```javascript
openBigLoader()
closeBigLoader()
```
