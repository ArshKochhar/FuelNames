library data_structures;


pub struct TokenMetaData {
    // This is left as an example. Support for dynamic length string is needed here
    name: str[5],
}

impl TokenMetaData {
    fn new(inputName: str[5]) -> Self {
        Self {
            name: inputName,
        }
    }
}
