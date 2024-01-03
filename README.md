# VueComponents

This project provides a collection of global components for Vue 2.6 that developers can utilize. These components serve as a second layer on top of Vuetify, making it easier for developers to incorporate them into their projects.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contribution](#contribution)

## Installation
To install the VueComponents library, clone the repository and follow these steps:

```bash
git clone https://github.com/SamLizard/VueComponents.git
cd VueComponents
npm install
```

## Usage
After installation, you can import the components from the `components` directory into your Vue files. Here's an example of how to import a component:

```javascript
import MyComponent from './global-components/MyComponent.vue';

export default {
 components: {
   'my-component': MyComponent
 }
}
```

Then, you can use the component in your HTML:

```html
<my-component></my-component>
```

For more detailed examples of usage, refer to the `componentsUsages` and `views` directories in the repository.

## Examples

The following sections detail the various components available within this project:

### Language Selection
Enables users to select the language for the website. Each component within this project is designed to support multiple languages.

### Date Picker
Allows users to select a date. This component offers the flexibility to set minimum and maximum dates or use a custom function for date validation.

### Time Picker
Permits users to select a time. Users can define a range of acceptable times and set active minutes at regular intervals from the start time.

### Navbar
Incorporates the website title, navigation links to authorized routes, informational displays, and a logout button.

### Popup Structure
Can be customized once and then reused throughout the project, with the ability to change only the content.

### Login and Register
Identifies the user and assigns their ID to the store.

### Display Search View
Provides users with the capability to view items, filter and sort them. Additionally, it allows for the removal of an item.

The project encapsulates several key functionalities including routing, state management (store), integration with Vuetify, internationalization (i18n), alerts via SweetAlert, dynamic imports (DL), and mixins where global rules can be externally personalized.

## Contribution
We welcome contributions to the VueComponents project. To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Please ensure your code adheres to our coding standards and passes all tests.
