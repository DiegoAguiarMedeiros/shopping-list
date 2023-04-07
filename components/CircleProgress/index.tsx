import React from 'react';
import { TextInputProps, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../constants/Colors';
import * as Progress from 'react-native-progress';

type CircleProgressProps = {
    progress: number,
    filled: number,
    total: number,
    size: number,
};

const CircleProgress = ({ filled,total, progress, size }: CircleProgressProps) => {
    const colorScheme = useColorScheme();

    const formatText = (progress: number) => {
        return `${progress}/${total}`;
    }
    return (
        <Progress.Circle
            progress={progress}
            size={size}
            unfilledColor={Colors[colorScheme ?? 'light'].secondary}
            color={Colors[colorScheme ?? 'light'].primary}
            showsText={true}
            formatText={() => formatText(filled)}
            strokeCap="round"
            allowFontScaling={true} />
    );
};
export default CircleProgress;

