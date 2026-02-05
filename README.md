# Project Setup

## 1. Install the repo
```bash
git clone git@github.com:capstone-1252/hpc-web-development.git`
## pull the most recent commit
git pull origin main
## Install depencencies
cd hpc-web-development/frontent
npm install
```
- Setting up an ssh key docs: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

## 2. Set up environment
- Rename ./.env.example to .env

## 3. Run the dev environme
```bash
npm run dev
```

# Using the cockpit api:

## Using dynamic data from cockpit:
- Because of how the astro build step prefetches content and outputs static html (we need to do this because of our hosting limitations), we need to include dynamic data using the client:load directive from astro [Reference](https://docs.astro.build/en/reference/directives-reference/#clientload)
- This needs to be done in a react component to allow for the browser to render the content
### Example Component
```tsx
// in a .astro file
---
import { MyComponent } from "@/components/MyComponent"
---

<MyComponent client:load />
```
### Fetching pattern
- Use a useEffect to fetch the data and useState to store the data  

```tsx
// in a .tsx file (react component)
import { useEffect, useState } from "react";
// the loader function
import loadData from "@/loaders/loadData";

export const MyComponent = () => {
    const [data, setData] = useState<Data[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await loadData();

            if(res) {
                setData(res);
            }
        }
        fetchData();
    }, [])

    return (
        { data.map((item) => <p>{ item.field }</p>) }
    )
}

```

- You can use the cockpit api anywhere on the frontend by importing it.
```ts
import cockpit from "@/lib/cockpit"
```
## Usage: 
- to use the cockpit api make sure the .env is properly setup to use the public cockpit api ref

```ts
// getting a collection 

const collection = await cockpit.getItems("<collection name>")

// example response from cockpit Board member:
interface BoardMemberResponse {
    name: string;
    position: string;
    // whatever the field name for the asset link
    photo: CockpitImage;
}
// cockpit image data response
interface CockpitImage {
    path: string
    //title of the asset
    title: string
}
// getting and using an image using the api
// first import the helper function:

import { getImageUrl } from "@/loaders/loadBoardMembers";
const imageRef = getImageUrl(member: BoardMemberResponse);

```
## Using an image in react:
```tsx
<img src={getImageUrl(member.photo)} />

```

# Cockpit Guide
### How to use and add various content to Cockpit:

- Use the common database table design to define the collections: [Reference from Microsoft](https://support.microsoft.com/en-us/office/database-design-basics-eb2159cf-1e30-401a-8084-bd4f9c9ca1f5) 
- Refer to the official cockpit documentation on the concepts: [Cockpit Reference](https://getcockpit.com/documentation/core/concepts/content) 

- To keep the content most organized, simply put.  Organize categories into collections, use the existing tables as examples.
