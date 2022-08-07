import React, { useState } from "react";
import styled from "styled-components";
import { Country, worldCountries } from "./countries";
import levenshtein from "fast-levenshtein";
import AnswerButtons from "./AnswerButtons";

interface TextInputProps {
  onSubmit: (country: Country) => void
}

const ANSWER_LIMIT = 5;
let StyledInput = styled.input`
  background-color: #222;
  border: 2px solid white;
  padding: 0.5em;
  color: white;
  text-align: center;
  border-radius: 5px;
`;

export default function TextInput(props: TextInputProps) {
  let [search, updateSearch] = useState("");
  let searchResults: [Country, number][] = [];
  let cleanedSearch = search.replace(/^\s*/, "").replace(/\s*$/, ""); //Remove leading/trailing spaces. 

  if (cleanedSearch.length > 0) { //Only display suggestions if there is a length of more than 0.
    worldCountries.forEach(country => {
      let score = searchScore(cleanedSearch, country.name); //Get the search score of the country.
      if (score === Infinity) score = levenshtein.get(cleanedSearch, country.name)+100; //Penalise spelling mistakes.
      let abbreviation = country.name.match(/\b([A-Z])/g)?.join(''); //Get abbreviation.
      let abbreviationScore = abbreviation?searchScore(cleanedSearch, abbreviation)-100:Infinity; //Score abbreviation. Abbreviation score is worth more than regular.

      let finalScore = Math.min(score, abbreviationScore);
      searchResults.push([country, finalScore]);
    });
  }
  searchResults = searchResults.sort((a, b) => { //Comparison. Sort by score ascending.
    if (a[1] > b[1]) {
      return 1;
    } else if (b[1] > a[1]) {
      return -1;
    } else { //If scores are the same then sort alphabetically (the countries may already be sorted I can't remember). 
      let aVal = a[0].name.toLowerCase().valueOf();
      let bVal = b[0].name.toLowerCase().valueOf();
      if (aVal > bVal) {
        return 1;
      } else if (bVal > aVal) {
        return -1;
      } else {
        return 0;
      }
    }
  }).slice(0, ANSWER_LIMIT);

  let countries = searchResults.map(res=>res[0]);

  let keyPressed = (evt: React.KeyboardEvent<HTMLInputElement>)=>{
    if (evt.key==="Enter") {
      if (countries.length > 0) { //Prevent submission if there are no search results.
        props.onSubmit(countries[0]);
      }
    } 
  }

  return (
    <div>
      <StyledInput autoFocus type="text" onInput={input=>{updateSearch(input.currentTarget.value);}} onKeyUp={keyPressed} placeholder="Search"/>
      <br/>
      <AnswerButtons emphasiseFirst countries={countries} onSubmit={props.onSubmit}/>
    </div>
  );
}


function searchScore(search: string, value: string) { //Search using a given string and count the characters that do not belong to the search (excluding the end of the string).
  let mismatchScore = 0;
  let searchIndex = 0;

  for (let valueChar of value) {
      if (valueChar.toLowerCase() === search[searchIndex].toLowerCase()) {
          searchIndex++;
          if (searchIndex === search.length) {
              break;
          }
      } else {
          mismatchScore += 1;
      }
  }

  if (searchIndex === search.length) {
      return mismatchScore;
  } else {
      return Infinity;
  }
}
