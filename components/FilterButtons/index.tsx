import React from 'react';
import { FlatList, Dimensions, useColorScheme } from 'react-native';
import Button from '../Button';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import { tagsIterface } from '../../types/types';


interface FilterButtonsProps {
    tags: tagsIterface[],
}

const FilterButtons = ({ tags }: FilterButtonsProps) => {
    const colorScheme = useColorScheme();
    const renderButton = ({ item }: any) => {
        return (
            <Styled.ButtonContainer>
                <Button background={item.active ? Colors[colorScheme ?? 'light'].buttonBackground : Colors[colorScheme ?? 'light'].cancelButtonBackground} text={item.name} />
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
