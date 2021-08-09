// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder'

// import {BiAlignLeft as textIcon} from 'react-icons/bi'
// import {BiVideo as videoIcon} from 'react-icons/bi'
// import {BiGlasses as quoteIcon} from 'react-icons/bi'
// import {BiImage as imageIcon} from 'react-icons/bi'
// import {BiBookBookmark as bookIcon} from 'react-icons/bi'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('References')
        .child(
          S.list()
            // Sets a title for our new list
            .title('References')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
                S.listItem()
                .title('Images')
                .child(
                      S.documentList()
                        .title('Images')
                        //.icon(imageIcon)
                        .filter('_type == "referenceItem" && referenceType == "referenceTypeImage"')
                ),
                S.listItem()
                .title('Texts')
                .child(
                      S.documentList()
                        .title('Texts')
                        //.icon(textIcon)
                        .filter('_type == "referenceItem" && referenceType == "referenceTypeText"')
                ),
              S.listItem()
                .title('Quotes')
                .child(
                      S.documentList()
                        .title('Quotes')
                        //.icon(quoteIcon)
                        .filter('_type == "referenceItem" && referenceType == "referenceTypeQuote"')
                ),
                S.listItem()
                .title('Books')
                .child(
                      S.documentList()
                        .title('Books')
                        //.icon(bookIcon)
                        .filter('_type == "referenceItem" && referenceType == "referenceTypeBook"')
                ),
                S.listItem()
                .title('Videos')
                .child(
                      S.documentList()
                        .title('Videos')
                        //.icon(videoIcon)
                        .filter('_type == "referenceItem" && referenceType == "referenceTypeVideo"')
                ),
            ])
        ),
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(listItem => !['referenceItem'].includes(listItem.getId()))
    ])