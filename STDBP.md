# Standard and Best Practices

###### - Daud Ho

## Naming Convention

General rule of thumb:-

-   Use of letters only
-   Fully spelled
-   Means what it does/assigns

### _Functional Components_

1. Use **PascalCase**
2. Keep word range between **1 - 2**
   _eg._ NameInput, Footer

### _Functions/Methods_

1. Use **camelCase**
2. Keep word range between **1 - 3**
3. Imperative verb
   _eg._ getId, queryCustomerNames

### _Variables_

1. Use **camelCase**
2. Keep word range between **1 - 2**
3. Noun
   _eg._ username, birthDate

### _Constants_

1. Use **UPPERCASE**
2. Keep words range between **1 - 4**
3. Use `_` for word spacing
   _eg._ USER_QUERY_ERROR

### _Private_

1. Reuse **Variables** rules
2. Prefix with `_`

## Repository Organization

### _Naming Convention_

1. Use **lowercase**
2. Keep word range at **1 only** | **1 - 2** (folder | file)
3. Use `_` for word spacing (css)
4. Reserved folder names
    - pages (_Next_)
    - public (_Standard_)
    - styles (_Standard_)
5. Reserved file names
    - \_app
    - index
    - 404

### _Grouping_

1. Component-centric - store files related to one component in one parent folder
   _eg._

```
styles
   |__User
      |__user.module.css
   |__Footer

stores
   |__User
      |__reducer
         |__User.ts
      |__model
         |__UserModel.ts
   |__App
```

## React Best Practices

1. Use functional components and hooks
2. Minimize usage of states
3. Use unique value for array keys
4. Use Fragments for rendering
5. Normalize boilerplates
6. Destructure your component props
7. Write unit test for each components

## Next Best Practices

1. Keep all the Next.js client-side code in small bundle
2. Choose the right rendering mode for the right use case

## ESLint
1. Best to force linting upon saving
2. Don't ignore linting errors

