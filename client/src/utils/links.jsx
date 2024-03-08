// eslint-disable-next-line no-unused-vars
import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
	{ text: 'add job', path: '.', icon: <IoBarChartSharp /> },
	{ text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
	{ text: 'stats', path: 'stats', icon: <FaWpforms /> },
	{ text: 'profile', path: 'profile', icon: <ImProfile /> },
	{ text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
];

export default links;
