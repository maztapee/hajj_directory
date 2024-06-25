
export const capitalizeFirstLetterOfEachWord = (string) => {
    return string.replace(/\b\w/g, char => char.toUpperCase());
};
// const test_touch = () =>{
//     console.log("contact clicked");
// };