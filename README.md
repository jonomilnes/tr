# Tamara Roper — Portfolio Site

This is your portfolio website. It lives at **https://jonomilnes.github.io/tr/**

Whenever you save a change on GitHub, the site automatically updates within about 2 minutes. You don't need to install anything or run any commands.

---

## How to edit content

All content lives in two places:

| What you want to change | File to edit |
|---|---|
| Case studies (projects) | `data/projects.ts` |
| Bio text, email, LinkedIn | `components/LeftBio.tsx` and `app/page.tsx` |

To edit a file on GitHub:
1. Go to **https://github.com/jonomilnes/tr**
2. Click the file you want to edit
3. Click the **pencil icon** (✏️) in the top right of the file
4. Make your changes
5. Scroll down and click **Commit changes**
6. The site updates automatically in ~2 minutes

---

## Updating a case study

Open **`data/projects.ts`**

Each case study looks like this:

```
{
  id: "AlphaSense",
  title: "AlphaSense",
  year: "2024",
  image: "/images/AlphaSense/Alphasense_1.jpeg",
  galleryImages: [
    "/images/AlphaSense/Alphasense_2.jpeg",
    "/images/AlphaSense/Alphasense_3.jpeg",
  ],
  brief: [
    "First paragraph of the brief.",
    "Second paragraph of the brief.",
  ],
  thinking: [
    "First paragraph of the thinking.",
  ],
  outcome: [
    "First paragraph of the outcome.",
  ],
},
```

### Fields you can change

**`title`** — The project name shown on the strip and at the top of the article.

**`year`** — The year shown next to the title.

**`brief`**, **`thinking`**, **`outcome`** — The three sections of the article. Each is a list of paragraphs. Each paragraph goes inside quotes and is separated by a comma.

To write **one paragraph**:
```
brief: [
  "This is the only paragraph.",
],
```

To write **multiple paragraphs**:
```
brief: [
  "This is the first paragraph.",
  "This is the second paragraph.",
  "This is the third paragraph.",
],
```

> ⚠️ Important: every paragraph must be inside `"quote marks"` and followed by a comma. Don't remove the square brackets `[` and `]` at the start and end.

### Things not to change

- The `id` field — this is used internally and must stay unique
- The `image` and `galleryImages` paths — unless you are also uploading new images (see below)
- Any of the punctuation around the text: `{`, `}`, `[`, `]`, `,`

---

## Uploading new images for a case study

1. Go to **https://github.com/jonomilnes/tr**
2. Navigate into the **`public/images/`** folder
3. Open the folder for your project (e.g. `AlphaSense`)
4. Click **Add file → Upload files**
5. Drag your images in and click **Commit changes**

Then update the image paths in `data/projects.ts` to match your new filenames:

```
image: "/images/AlphaSense/my-new-image.jpg",
galleryImages: [
  "/images/AlphaSense/my-second-image.jpg",
  "/images/AlphaSense/my-third-image.jpg",
],
```

> The filename must match exactly, including upper/lowercase letters.

---

## Updating the bio text

The bio appears on the left side of the desktop site and at the top on mobile.

### Desktop bio text

Open **`components/LeftBio.tsx`**

Find this section near the bottom of the file:

```
<p style={{ marginBottom: "0.5rem" }}>Hello.</p>
<p style={{ marginBottom: "0.5rem" }}>
  I'm Tamara, currently Associate Copy Director at Saffron, Madrid.
</p>
<p>
  I lead verbal identity across the agency...
</p>
```

Replace the text between the `>` and `</p>` tags with your new text. Don't change anything else on those lines.

### Mobile bio text

Open **`app/page.tsx`**

Search for the same paragraph text — there is a copy of the bio for mobile screens a little further down in the same file. Update it the same way.

### Email address

In both files above, find the line that contains `tamara_r@live.co.uk` and replace it with your new email in both places (the link address and the visible text):

```
href="mailto:your-new-email@example.com"
...
your-new-email@example.com
```

### LinkedIn URL

Similarly, find the line containing `linkedin.com/in/tamara-roper-4097abaa` and replace the URL with your own LinkedIn profile URL.

---

## Changing the order of case studies

The projects are displayed in the order they appear in `data/projects.ts`. To reorder them, cut and paste the entire block for a project (from `{` to `},`) to a different position in the list.

---

## If something looks broken

- Check that all quote marks are straight `"` not curly `""`
- Check that every paragraph ends with a comma `,`
- Check that the square brackets `[` and `]` are still there around each section
- Go to **https://github.com/jonomilnes/tr/actions** to see if there was an error — it will show a red cross if something went wrong
