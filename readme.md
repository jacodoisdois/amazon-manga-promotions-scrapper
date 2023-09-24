# Amazon Manga Promotions Scrapper 📚🏯

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

The Amazon Manga Promotions Scrapper is a TypeScript application that allows you to search for manga volumes on Amazon and retrieve all volumes under promotional prices. You can specify whether to search for specific volumes, all volumes, or a sequence of volumes. Additionally, you have the option to ignore certain volumes if needed. Happy manga hunting! 🎉

## Table of Contents

- [Config file](#config-file)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

## Config file
### Adding a new manga entry

  To track promotions for your wished manga titles, you can add entries to the `mangas` attribute within your `settings.json` file. Here's how to do it:

  1. Locate the `mangas` Attribute

      Open your `settings.json` file, and within it, you will find the `mangas` attribute.


      ```json

        {
          "mangas": [
            {
              "name": "Manga Title Here",
              "volumeInfo": {
                "max": 99,
                "volumesToIgnore": [
                  "Array of Volumes to Search - integers"
                ],
                "volumesToSearch": [
                  "Array of Volumes to Ignore - integers"
                ]
              }
            }
          ]
        }


      ```

      - Replace "Manga Title Here" with the name of the manga as it appears on Amazon.
      - Set "Maximum Number of Volumes" to the total number of volumes available for this manga.
      - If you want to search for specific volumes, list them in the "Array of Volumes to Search".
      - If there are volumes you want to skip, include them in the "Array of Volumes to Ignore".

      Repeat this process to add as many manga entries as you need to track promotions for different titles. Save the settings.json file after making changes.
      Now, the application will automatically scrape and track promotions for the manga titles you've added to the mangas attribute.📚🎉
## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/jacomaga/amazon-manga-promotions-scrapper.git
   ```
2. Clone the repository:
    ```sh
    cd amazon-manga-promotions-scrapper
    yarn install
    ```
## Usage

  To use the Amazon Manga Promotions Scrapper, follow these steps:

1. Set up the configuration file `settings.json`:

    Add your mangas to search for promotions following the steps [here](#config-file)

2. Run the application using Yarn:
    ```sh
    yarn start
    ```

## Features

  - Search for manga volumes on Amazon.
  - Filter manga by specific volumes, all volumes, or a sequence of volumes.
  - Option to ignore certain volumes.
  - Retrieve manga under promotional prices.

## Contributing

Contributions are welcome! If you'd like to contribute, you can fork the repository and submit a pull request.
