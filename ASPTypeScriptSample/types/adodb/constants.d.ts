//--------------------------------------------------------------------
// Microsoft ADO
//
// (c) 1996 Microsoft Corporation.  All Rights Reserved.
//
//
//
// ADO constants include file for VBScript
//
//--------------------------------------------------------------------

//---- CursorTypeEnum Values ----
declare const adOpenForwardOnly = 0
declare const adOpenKeyset = 1
declare const adOpenDynamic = 2
declare const adOpenStatic = 3

//---- CursorOptionEnum Values ----
declare const adHoldRecords = 0x00000100
declare const adMovePrevious = 0x00000200
declare const adAddNew = 0x01000400
declare const adDelete = 0x01000800
declare const adUpdate = 0x01008000
declare const adBookmark = 0x00002000
declare const adApproxPosition = 0x00004000
declare const adUpdateBatch = 0x00010000
declare const adResync = 0x00020000
declare const adNotify = 0x00040000

//---- LockTypeEnum Values ----
declare const adLockReadOnly = 1
declare const adLockPessimistic = 2
declare const adLockOptimistic = 3
declare const adLockBatchOptimistic = 4

//---- ExecuteOptionEnum Values ----
declare const adRunAsync = 0x00000010

//---- ObjectStateEnum Values ----
declare const adStateClosed = 0x00000000
declare const adStateOpen = 0x00000001
declare const adStateConnecting = 0x00000002
declare const adStateExecuting = 0x00000004

//---- CursorLocationEnum Values ----
declare const adUseServer = 2
declare const adUseClient = 3

//---- DataTypeEnum Values ----
declare const adEmpty = 0
declare const adTinyInt = 16
declare const adSmallInt = 2
declare const adInteger = 3
declare const adBigInt = 20
declare const adUnsignedTinyInt = 17
declare const adUnsignedSmallInt = 18
declare const adUnsignedInt = 19
declare const adUnsignedBigInt = 21
declare const adSingle = 4
declare const adDouble = 5
declare const adCurrency = 6
declare const adDecimal = 14
declare const adNumeric = 131
declare const adBoolean = 11
declare const adError = 10
declare const adUserDefined = 132
declare const adVariant = 12
declare const adIDispatch = 9
declare const adIUnknown = 13
declare const adGUID = 72
declare const adDate = 7
declare const adDBDate = 133
declare const adDBTime = 134
declare const adDBTimeStamp = 135
declare const adBSTR = 8
declare const adChar = 129
declare const adVarChar = 200
declare const adLongVarChar = 201
declare const adWChar = 130
declare const adVarWChar = 202
declare const adLongVarWChar = 203
declare const adBinary = 128
declare const adVarBinary = 204
declare const adLongVarBinary = 205

//---- FieldAttributeEnum Values ----
declare const adFldMayDefer = 0x00000002
declare const adFldUpdatable = 0x00000004
declare const adFldUnknownUpdatable = 0x00000008
declare const adFldFixed = 0x00000010
declare const adFldIsNullable = 0x00000020
declare const adFldMayBeNull = 0x00000040
declare const adFldLong = 0x00000080
declare const adFldRowID = 0x00000100
declare const adFldRowVersion = 0x00000200
declare const adFldCacheDeferred = 0x00001000

//---- EditModeEnum Values ----
declare const adEditNone = 0x0000
declare const adEditInProgress = 0x0001
declare const adEditAdd = 0x0002
declare const adEditDelete = 0x0004

//---- RecordStatusEnum Values ----
declare const adRecOK = 0x0000000
declare const adRecNew = 0x0000001
declare const adRecModified = 0x0000002
declare const adRecDeleted = 0x0000004
declare const adRecUnmodified = 0x0000008
declare const adRecInvalid = 0x0000010
declare const adRecMultipleChanges = 0x0000040
declare const adRecPendingChanges = 0x0000080
declare const adRecCanceled = 0x0000100
declare const adRecCantRelease = 0x0000400
declare const adRecConcurrencyViolation = 0x0000800
declare const adRecIntegrityViolation = 0x0001000
declare const adRecMaxChangesExceeded = 0x0002000
declare const adRecObjectOpen = 0x0004000
declare const adRecOutOfMemory = 0x0008000
declare const adRecPermissionDenied = 0x0010000
declare const adRecSchemaViolation = 0x0020000
declare const adRecDBDeleted = 0x0040000

//---- GetRowsOptionEnum Values ----
declare const adGetRowsRest = -1

//---- PositionEnum Values ----
declare const adPosUnknown = -1
declare const adPosBOF = -2
declare const adPosEOF = -3

//---- enum Values ----
declare const adBookmarkCurrent = 0
declare const adBookmarkFirst = 1
declare const adBookmarkLast = 2

//---- MarshalOptionsEnum Values ----
declare const adMarshalAll = 0
declare const adMarshalModifiedOnly = 1

//---- AffectEnum Values ----
declare const adAffectCurrent = 1
declare const adAffectGroup = 2
declare const adAffectAll = 3

//---- FilterGroupEnum Values ----
declare const adFilterNone = 0
declare const adFilterPendingRecords = 1
declare const adFilterAffectedRecords = 2
declare const adFilterFetchedRecords = 3
declare const adFilterPredicate = 4

//---- SearchDirection Values ----
declare const adSearchForward = 1
declare const adSearchBackward = -1

//---- ConnectPromptEnum Values ----
declare const adPromptAlways = 1
declare const adPromptComplete = 2
declare const adPromptCompleteRequired = 3
declare const adPromptNever = 4

//---- ConnectModeEnum Values ----
declare const adModeUnknown = 0
declare const adModeRead = 1
declare const adModeWrite = 2
declare const adModeReadWrite = 3
declare const adModeShareDenyRead = 4
declare const adModeShareDenyWrite = 8
declare const adModeShareExclusive = 0xc
declare const adModeShareDenyNone = 0x10

//---- IsolationLevelEnum Values ----
declare const adXactUnspecified = 0xffffffff
declare const adXactChaos = 0x00000010
declare const adXactReadUncommitted = 0x00000100
declare const adXactBrowse = 0x00000100
declare const adXactCursorStability = 0x00001000
declare const adXactReadCommitted = 0x00001000
declare const adXactRepeatableRead = 0x00010000
declare const adXactSerializable = 0x00100000
declare const adXactIsolated = 0x00100000

//---- XactAttributeEnum Values ----
declare const adXactCommitRetaining = 0x00020000
declare const adXactAbortRetaining = 0x00040000

//---- PropertyAttributesEnum Values ----
declare const adPropNotSupported = 0x0000
declare const adPropRequired = 0x0001
declare const adPropOptional = 0x0002
declare const adPropRead = 0x0200
declare const adPropWrite = 0x0400

//---- ErrorValueEnum Values ----
declare const adErrInvalidArgument = 0xbb9
declare const adErrNoCurrentRecord = 0xbcd
declare const adErrIllegalOperation = 0xc93
declare const adErrInTransaction = 0xcae
declare const adErrFeatureNotAvailable = 0xcb3
declare const adErrItemNotFound = 0xcc1
declare const adErrObjectInCollection = 0xd27
declare const adErrObjectNotSet = 0xd5c
declare const adErrDataConversion = 0xd5d
declare const adErrObjectClosed = 0xe78
declare const adErrObjectOpen = 0xe79
declare const adErrProviderNotFound = 0xe7a
declare const adErrBoundToCommand = 0xe7b
declare const adErrInvalidParamInfo = 0xe7c
declare const adErrInvalidConnection = 0xe7d
declare const adErrStillExecuting = 0xe7f
declare const adErrStillConnecting = 0xe81

//---- ParameterAttributesEnum Values ----
declare const adParamSigned = 0x0010
declare const adParamNullable = 0x0040
declare const adParamLong = 0x0080

//---- ParameterDirectionEnum Values ----
declare const adParamUnknown = 0x0000
declare const adParamInput = 0x0001
declare const adParamOutput = 0x0002
declare const adParamInputOutput = 0x0003
declare const adParamReturnValue = 0x0004

//---- CommandTypeEnum Values ----
declare const adCmdUnknown = 0x0008
declare const adCmdText = 0x0001
declare const adCmdTable = 0x0002
declare const adCmdStoredProc = 0x0004

//---- SchemaEnum Values ----
declare const adSchemaProviderSpecific = -1
declare const adSchemaAsserts = 0
declare const adSchemaCatalogs = 1
declare const adSchemaCharacterSets = 2
declare const adSchemaCollations = 3
declare const adSchemaColumns = 4
declare const adSchemaCheckconstraints = 5
declare const adSchemaconstraintColumnUsage = 6
declare const adSchemaconstraintTableUsage = 7
declare const adSchemaKeyColumnUsage = 8
declare const adSchemaReferentialContraints = 9
declare const adSchemaTableconstraints = 10
declare const adSchemaColumnsDomainUsage = 11
declare const adSchemaIndexes = 12
declare const adSchemaColumnPrivileges = 13
declare const adSchemaTablePrivileges = 14
declare const adSchemaUsagePrivileges = 15
declare const adSchemaProcedures = 16
declare const adSchemaSchemata = 17
declare const adSchemaSQLLanguages = 18
declare const adSchemaStatistics = 19
declare const adSchemaTables = 20
declare const adSchemaTranslations = 21
declare const adSchemaProviderTypes = 22
declare const adSchemaViews = 23
declare const adSchemaViewColumnUsage = 24
declare const adSchemaViewTableUsage = 25
declare const adSchemaProcedureParameters = 26
declare const adSchemaForeignKeys = 27
declare const adSchemaPrimaryKeys = 28
declare const adSchemaProcedureColumns = 29

//---- StreamTypeEnum Values ----
declare const adTypeBinary = 1
declare const adTypeText = 2
