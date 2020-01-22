export class ConsoleSerializer {

    private static INSTANCE = new ConsoleSerializer();

    static get instance() {
      return this.INSTANCE;
    }

    public serializePostRequest(request: any) {
        const requestObj = [{
            timestamp: '2019-06-19T14:54:00+05:30',
            id: '67fb6791-e975-412a-886c-c5c22e5d8166',
            version: '1.0.3',
            actor: {
            mbox: 'mailto:mukul@gooru.org',
            objectType: 'Agent',
            },
            verb: {
            id: 'http://adlnet.gov/expapi/verbs/answered',
            display: {
            'en-US': 'answered',
            },
            },
            object: {
            id: 'http://adlnet.gov/expapi/activities/example',
            definition: {
            name: {
            'en-US': 'Example Activity',
            },
            description: {
            'en-US': 'Example activity description',
            },
            type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
            moreInfo: 'http://virtualmeeting.gooru.org/12345',
            interactionType: 'sequencing',
            choices: [{
            id: 'photography',
            description: {
            'en-US': 'Advanced Photography',
            },
            }, {
            id: 'SEO',
            description: {
            'en-US': 'Search Engine Optimization',
            },
            }, {
            id: 'Cycling',
            description: {
            'en-US': 'Long Distance Cycling',
            },
            }],
            correctResponsesPattern: ['max[,]neo[,]mac[,]oracle'],
            },
            objectType: 'Activity',
            },
            result: {
            score: {
            scaled: 100,
            raw: 100,
            min: 9,
            max: 100,
            },
            success: true,
            completion: true,
            response: 'Completed',
            duration: 'PT5H25M30.10S',
            },
            context: {
            registration: 'df629bd4-4285-43d3-8418-dff81d81d45a',
            instructor: {
            mbox: 'mailto:gooruteacher@gooru.org',
            name: 'Gooru',
            },
            team: {
            name: 'Kangooru',
            member: [{
            name: 'Name1',
            account: {
            homePage: 'http://www.gooru.org',
            name: '13936749',
            },
            objectType: 'Agent',
            }, {
            name: 'Name2',
            mbox_sha1sum: 'ebd31e95054c018b10727de4db3ef2ec3a016ee9',
            objectType: 'Agent',
            }],
            objectType: 'Group',
            },
            contextActivities: {
            grouping: [{
            definition: {
            name: {
            'en-US': 'Statement Builder Context',
            },
            },
            id: 'http://adlnet.github.io/xapi-lab/index.html#context',
            objectType: 'Activity',
            }],
            parent: [{
            definition: {
            name: {
            'en-US': 'xAPI Lab',
            },
            description: {
            'en-US': 'Assisting in developing statements and communicating with a Learning Record Store (LRS)',
            },
            },
            id: 'http://adlnet.github.io/xapi-lab',
            objectType: 'Activity',
            }],
            category: [{
            id: 'http://gooru.org/xapi/profile/xapi-tool',
            }],
            other: [{
            id: 'http://adlnet.github.io',
            }],
            },
            },
            }];
    }


}

export const consoleSerializer = ConsoleSerializer.instance;
