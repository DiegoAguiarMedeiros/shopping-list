import React from 'react';
import { FlatList, Dimensions, useColorScheme } from 'react-native';
import Button from '../Button';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import { tagsIterface } from '../../types/types';


interface FilterButtonsProps {
    tags: tagsIterface[],
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
}

const FilterButtons = ({ tags, filter, setFilter }: FilterButtonsProps) => {
    const colorScheme = useColorScheme();
    const renderButton = ({ item }: any) => {
        const handlePress = () => {
            setFilter(item.name)
        }
        return (
            <Styled.ButtonContainer>
                <Button onPress={handlePress} background={filter === item.name ? Colors[colorScheme ?? 'light'].buttonBackground : Colors[colorScheme ?? 'light'].cancelButtonBackground} text={item.name} />
            </Styled.ButtonContainer>
        );
    };

    return (
        <Styled.Container>
            <FlatList
                horizontal
                data={tags}
                keyExtractor={(tag) => tag.id}
                renderItem={renderButton}
                showsHorizontalScrollIndicator={false}
            />
        </Styled.Container>
    );
};

export default FilterButtons;
