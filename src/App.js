import React, { Component } from 'react';
import './App.css';
import {
	List,
	CircularProgress,
	IconButton,
	Card,
	CardMedia,
	CardActionArea,
	ImageListItemBar,
	Backdrop,
	Grid,
	Box,
	CardContent,
	Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import StarBorderIcon from '@material-ui/icons/StarBorder';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			koobs: [],
			page: 1,
			loading: false,
		};
	}

	componentDidMount = () => {
		window.addEventListener('scroll', this.infiniteScroll);
		this.fetchData(this.state.page);
	};

	infiniteScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			let newPage = this.state.page;
			newPage++;
			this.setState({
				page: newPage,
				loading: true,
			});
			this.fetchData(newPage);
		}
	};

	fetchData = (pageNum) => {
		let Url =
			'https://koober.com/fr/api/koobs/categories/tous?orderby=&page=' +
			pageNum;

		fetch(Url)
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					koobs: [...this.state.koobs, ...data],
					loading: false,
				});
			});
	};

	render() {
		const { loading } = this.state;
		return (
			<Grid container justifyContent="space-between">
				{this.state.koobs.map((koob, index) => {
					return (
						<Grid item xs={4} style={{ margin: '1rem 0' }} className={'flex'}>
							<Card style={{ width: 300 }}>
								<CardActionArea>
									{!loading && koob.book.img_url.length > 0 ? (
										<CardMedia
											height={130}
											component="img"
											alt={`${koob.id}-${koob.book.writer}`}
											title={koob.book.title}
											image={koob.book.img_url}
										/>
									) : (
										<Skeleton animation="wave" variant="rect" height={130} />
									)}
									<CardContent>
										<Typography gutterBottom variant="caption">
											Autheur:{' '}
											<Typography
												variant="body2"
												color="textSecondary"
												component="span"
											>
												{koob.book.writer}
											</Typography>
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					);
				})}
				{this.state.loading && (
					<Backdrop style={{ zIndex: 10 }} open={this.state.loading}>
						<CircularProgress color="inherit" className="loader" />
					</Backdrop>
				)}
			</Grid>
		);
	}
}

export default App;
