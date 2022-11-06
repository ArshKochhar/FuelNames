library data_structures;


pub struct TokenMetaData {
    // This is left as an example. Support for dynamic length string is needed here
    svgP1: str[716],
    name: str[20],
    svgP2: str[28]
}

impl TokenMetaData {
    fn new(inputName: str[20]) -> Self {
        Self {
            svgP1: "PHN2ZyB3aWR0aD0iMjcwIiBoZWlnaHQ9IjI3MCIgdmlld0JveD0iMCAwIDI3MCAyNzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iIzFFMUUxRSIgZD0iTTAgMGgyNzB2MjcwSDB6Ii8+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoMjcwdjI3MEgweiIvPgogICAgPHBhdGggZmlsbD0iIzBBMDcxQSIgZD0iTTAgMGgyNzB2MjcwSDB6Ii8+CiAgPC9nPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSJhIj4KICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgyNzB2MjcwSDB6Ii8+CiAgICA8L2NsaXBQYXRoPgogIDwvZGVmcz4KICA8dGV4dCB4PSIzMi41IiB5PSIyMzEiIGZvbnQtc2l6ZT0iMjciIGZpbGw9IiMwMUZGQzgiIGZvbnQtZmFtaWx5PSJQbHVzIEpha2FydGEgU2FucyxEZWphVnUgU2FucyxOb3RvIENvbG9yIEVtb2ppLEFwcGxlIENvbG9yIEVtb2ppLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj4=",
            name: inputName,
            svgP2:"LmZ1ZWw8L3RleHQ+Cjwvc3ZnPg==",
        }
    }
}