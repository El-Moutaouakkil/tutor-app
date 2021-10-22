const fuzzyMatch = (text, search) => {
    /*
    Parameter text is a title, search is the user's search
    */
    // remove spaces, lower case the search so the search
    // is case insensitive
    search = search.replace(/ /g, "").toLowerCase();
    let tokens = [];
    let search_position = 0;

    [...text].forEach((character) => {
        if (
            search_position < search.length &&
            character.toLowerCase() === search.charAt(search_position)
        ) {
            character =
                "<strong style = 'font-weight : 700;color : #1E8BC3'>" +
                character +
                "</strong>";
            search_position += 1;
        }
        tokens.push(character);
    });

    // If are characters remaining in the search text,
    // return an empty string to indicate no match
    if (search_position !== search.length) {
        return "";
    }
    return tokens.join("");
};

export default fuzzyMatch;
