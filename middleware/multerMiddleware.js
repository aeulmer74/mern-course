import multer from 'multer';

//create storage disk vs. memory
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/upload'); //null for errors, then destination
	},
	filename: (req, file, cb) => {
		//technically optional
		const filename = file.originalname;
		cb(null, filename);
	},
});

const upload = multer({ storage });
export default upload;
