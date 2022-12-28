import { PipelineStage } from 'mongoose';

export const sortOrder = {
    ASCENDING: 1,
    DESCENDING: -1,
} as const;

export type SortOrder = typeof sortOrder[keyof typeof sortOrder];
export interface getMovementsAggrParams {
    sort?: SortOrder;
    skip?: number;
    limit?: number;
}

export const getMovementsAggrStages = ({
    sort = sortOrder.ASCENDING,
    skip = 0,
    limit = 10,
}: getMovementsAggrParams = {}): PipelineStage[] => [
    {
        $lookup: {
            from: 'ingredients',
            localField: 'ingredient',
            foreignField: '_id',
            as: 'ingredient',
        },
    },
    {
        $unwind: '$movements',
    },
    {
        $unwind: '$ingredient',
    },
    {
        $sort: {
            'movements.createdAt': sort,
        },
    },
    {
        $project: {
            movements: {
                $mergeObjects: {
                    $let: {
                        vars: {
                            movements: '$movements',
                            ingredient: '$ingredient',
                        },
                        in: {
                            $mergeObjects: [
                                '$$movements',
                                {
                                    ingredient: '$$ingredient',
                                },
                            ],
                        },
                    },
                },
            },
        },
    },
    {
        $group: {
            _id: null,
            movements: {
                $push: '$movements',
            },
        },
    },
    {
        $project: {
            result: {
                $slice: ['$movements', skip, limit],
            },
        },
    },
];
