import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import { t } from 'i18next';
import {
    ChangeEventHandler,
    FormEventHandler,
    FunctionComponent,
    useState,
} from 'react';
import { useFilesUpload } from '../core/api/files/files-upload';

const HomeRoute: FunctionComponent = () => {
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState(false);

    const { mutate: getUploadUrl } = useFilesUpload({
        onSettled: () => {
            setLoading(false);
            alert(`File uploaded`);
            setFile(undefined);
        }
    });

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFile(event.target.files?.[0]);
    };

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        setLoading(true);

        // Simulate file upload
        getUploadUrl({ file });
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                mt: 4,
                mb: 4,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: 4,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    maxWidth: 400,
                    margin: 'auto',
                    marginTop: 4,
                }}
            >
                <Typography variant="h6">{t('home.title')}</Typography>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ width: '100%' }}
                >
                    {t('home.filePicker')}
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {file && (
                    <TextField
                        value={file.name}
                        InputProps={{ readOnly: true }}
                        sx={{ width: '100%' }}
                    />
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ width: '100%' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Upload'}
                </Button>
            </Box>
        </Container>
    );
};

export default HomeRoute;
