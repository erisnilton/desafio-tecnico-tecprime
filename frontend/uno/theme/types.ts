export interface Theme {
    variables?: Record<string,string>,
    colors?: Record<string, string>,

}

export interface ThemeOptions {
    globals?: Theme
    themes?: Record<string, Theme>
}