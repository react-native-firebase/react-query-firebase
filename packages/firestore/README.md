# React Query Firebase Hooks for Cloud Firestore

React Query Firebase hooks for Cloud Firestore.

## Installation

If you haven't done so already, install `react` and `react-query`:

```bash
npm i --save react react-query
```

Before using this library, ensure React Query is set up by following the [Installation](https://react-query.tanstack.com/quick-start) guide.

Next install this package;

```bash
npm i --save @react-query-firebase/firestore
```

> Note: this library only works on the new Firebase Web v9+ SDKs.

## Available Hooks

- useFirestoreQuery
- useFirestoreQueryData
- useFirestoreDocument
- useFirestoreDocumentData
- useFirestoreCollectionMutation
- useFirestoreDocumentMutation

## Example

The library provides a set of un-opinionated hooks to integrate with Firebase. You provide the
Firebase instances, the library does the rest.

```jsx
import React from "react";
import { collection, doc } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

// Exported Firestore instance.
import firestore from "./config/firebase";

function App() {
  const products = useFirestoreQuery(
    "products",
    collection(firestore, "products"),
    {
      subscribe: true,
    }
  );

  if (products.isLoading) {
    return <div>Loading...</div>;
  }

  if (products.isError) {
    return <div>Error!</div>;
  }

  return (
    <ul>
      {products.data.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

## License

- See [LICENSE](/LICENSE)

---

<p align="center">
  <a href="https://invertase.io/?utm_source=readme&utm_medium=footer&utm_campaign=react-query-firbase-hooks">
    <img width="75px" src="https://static.invertase.io/assets/invertase/invertase-rounded-avatar.png">
  </a>
  <p align="center">
    Built and maintained by <a href="https://invertase.io/?utm_source=readme&utm_medium=footer&utm_campaign=react-query-firbase-hooks">Invertase</a>.
  </p>
</p>
