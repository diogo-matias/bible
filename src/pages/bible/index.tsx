import { Box } from "@mui/material";
import { Header } from "../../components/header";
import { ArrowControllers } from "../../components/controlers";
import { BibleContent } from "../../components/bibleContent";

export default function BiblePage() {
    return (
        <Box>
            <Header />
            <BibleContent />
            <ArrowControllers />
        </Box>
    );
}
