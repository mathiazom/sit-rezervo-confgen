import {Alert, Box, createTheme, ThemeProvider} from "@mui/material";
import {CopyBlock, obsidian} from "react-code-blocks";
import React, {useEffect, useState} from "react";


const codeTheme = createTheme({
    typography: {
        fontFamily: "monospace"
    }
});

const Config = ({classes}: { classes: any[] }) => {

    const [classConfig, setClassesConfig] = useState<string>('');

    function timeForClass(_class: any) {
        const date = new Date(_class.from)
        return {
            hour: date.getHours(),
            minute: date.getMinutes()
        }
    }

    useEffect(() => {
        function configForClass(_class: any) {
            const time = timeForClass(_class)
            return `- activity: ${_class.activityId}
    display_name: "${_class.name}"
    weekday: ${_class.weekday}
    studio: ${_class.studio.id}
    time:
      hour: ${time.hour}
      minute: ${time.minute}`
        }

        setClassesConfig(
            classes.length > 0 ?
                `classes:\n  ${classes.map((c: any) => configForClass(c)).join("\n  ")}` : ''
        )
    }, [classes])

    return (
        classes.length > 0 ?
            <ThemeProvider theme={codeTheme}>
                <CopyBlock
                    text={classConfig}
                    language={"yaml"}
                    wrapLines
                    theme={obsidian}
                    copied={false}
                />
            </ThemeProvider>
            :
            <Box>
                <Alert severity="info">Select classes to the left to generate your
                    config.yaml</Alert>
            </Box>
    )
}

export default Config