import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavMountainData, deleteFavMountain } from '../../redux/actions/favMountainActions';
import { Container, Card, Button, Icon } from 'semantic-ui-react';
import { RootState } from '../../redux/store';

interface FavMountainData {
    id: string;
    userId: string;
    skiAreaSlug: string;
    skiAreaName: string;
}

interface FavMountainProps {
    userId: string;
    favMountain: FavMountainData[] | null;
    error: string | null;
    fetchFavMountainData: (userId: string) => void
    deleteFavMountain: (id: string) => void
};

const FavMountain: React.FC<FavMountainProps> = ({ userId, favMountain, error, fetchFavMountainData, deleteFavMountain }) => {
    useEffect(() => {
        fetchFavMountainData(userId);
    }, [userId, fetchFavMountainData]);

    if(error) {
        return <p>{`Error fetching Favorite Mountain Data! Error: ${error}`}</p>
    };

    if(favMountain) {
        return (
            <Container fluid>
                {favMountain.length > 0 ? 
                    favMountain.map(fav => (
                        <Card key={fav.skiAreaSlug}>
                            <Card.Header>{fav.skiAreaName}</Card.Header>
                            <Card.Content extra>
                                <Button onClick={() => deleteFavMountain(fav.id)}>
                                    <Icon name='cancel' />
                                </Button>
                            </Card.Content>
                        </Card>
                    ))
                    :
                    <p>No Favorite Mountains Yet!</p>}
            </Container>
        )
    }

    return null;
};

const mapStateToProps = (state: RootState) => ({
    favMountain: state.favMountain.data,
    error: state.favMountain.error
});

const mapDispatchToProps = {
    fetchFavMountainData,
    deleteFavMountain
};

export default connect(mapStateToProps, mapDispatchToProps)(FavMountain);